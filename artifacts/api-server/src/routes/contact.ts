import { Router } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { name, email, message } = parsed.data;

  try {
    const [submission] = await db
      .insert(contactSubmissionsTable)
      .values({ name, email, message })
      .returning();

    res.status(201).json({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      createdAt: submission.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to store contact submission");
    res.status(500).json({ error: "Failed to store submission" });
  }
});

export default contactRouter;
