import nodemailer from "nodemailer";
import { db, contactJobsTable, contactSubmissionsTable, eq, and, sql } from "@workspace/db";
import { logger } from "./lib/logger";

const POLL_INTERVAL = 5000; // 5 seconds
const MAX_RETRIES = 5;

// Use a mock transporter for testing if SMTP is not available
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  // Adding this for potential SSL issues in some environments
  tls: {
    rejectUnauthorized: false
  }
});

async function processJob() {
  try {
    // Atomic select and update status to 'processing' using SKIP LOCKED for reliability
    const [job] = await db
      .update(contactJobsTable)
      .set({ status: "processing", updatedAt: new Date() })
      .where(
        and(
          eq(contactJobsTable.status, "pending"),
          sql`id = (
            SELECT id FROM ${contactJobsTable}
            WHERE status = 'pending'
            ORDER BY created_at ASC
            FOR UPDATE SKIP LOCKED
            LIMIT 1
          )`
        )
      )
      .returning();

    if (!job) return;

    const [submission] = await db
      .select()
      .from(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.id, job.submissionId))
      .limit(1);

    if (!submission) {
      await db
        .update(contactJobsTable)
        .set({ status: "failed", lastError: "Submission not found", updatedAt: new Date() })
        .where(eq(contactJobsTable.id, job.id));
      return;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || "garibulnawaz@gmail.com",
      to: "garibulsingh@gmail.com",
      subject: "[SYSTEM SIGNAL] New Portfolio Contact Request",
      text: `
Name: ${submission.name}
Email: ${submission.email}
Company: ${submission.company || "N/A"}
Timestamp: ${submission.createdAt.toISOString()}

Message:
${submission.message}
`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await db
        .update(contactJobsTable)
        .set({ status: "sent", updatedAt: new Date() })
        .where(eq(contactJobsTable.id, job.id));
      logger.info({ jobId: job.id }, "Email sent successfully");
    } catch (err: any) {
      const nextRetryCount = job.retryCount + 1;
      const nextStatus = nextRetryCount >= MAX_RETRIES ? "failed" : "pending";

      await db
        .update(contactJobsTable)
        .set({
          status: nextStatus,
          retryCount: nextRetryCount,
          lastError: err.message,
          updatedAt: new Date(),
        })
        .where(eq(contactJobsTable.id, job.id));

      logger.error({ jobId: job.id, err }, "Failed to send email");
    }
  } catch (err) {
    logger.error({ err }, "Worker error during job processing");
  }
}

export async function startWorker() {
  logger.info("Starting background worker...");

  // Basic validation of credentials
  if (!process.env.GMAIL_USER || !process.env.GOOGLE_APP_PASSWORD) {
    logger.error("SMTP credentials missing. Worker will not be able to send emails reliably.");
  }

  // Poll for jobs
  setInterval(async () => {
    // Process multiple jobs if available, but keep it simple with one at a time for now
    await processJob();
  }, POLL_INTERVAL);
}
