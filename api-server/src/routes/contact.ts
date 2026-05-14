import { Router } from "express";
import { db, contactSubmissionsTable, contactJobsTable } from "@workspace/db";
import { z } from "zod";

const SubmitContactBody = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
});

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.format() });
    return;
  }

  const { name, email, company, message } = parsed.data;

  try {
    await db.transaction(async (tx) => {
      const [submission] = await tx
        .insert(contactSubmissionsTable)
        .values({ name, email, company, message })
        .returning();

      await tx
        .insert(contactJobsTable)
        .values({ submissionId: submission.id });
    });

    res.status(201).json({
      status: "queued",
      message: "signal received",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to process contact submission");
    res.status(500).json({ error: "Failed to process submission" });
  }
});

export default contactRouter;
