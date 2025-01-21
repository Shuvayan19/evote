import { startCleanupCron, runCleanupNow } from "../../../../lib/cronJobs";

runCleanupNow();
// Start the cron job only on the server side and in production
if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
  startCleanupCron();
}

export async function GET() {
  return Response.json({ status: "ok" });
}
