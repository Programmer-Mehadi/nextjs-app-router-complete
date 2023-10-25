const user = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Williams" },
];

export async function GET() {
  return Response.json({ data: user, message: "Hello User, Next.js!" });
}
