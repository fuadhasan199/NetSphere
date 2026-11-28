import { registerUser } from "@/controllers/auth.controller";


export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await registerUser(body);
  return Response.json(result, { status: result.status });
}