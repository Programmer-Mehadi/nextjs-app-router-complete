const user = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Williams" },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userData = await user.find((u) => u.id === Number(params.id));
  console.log(userData);
  return Response.json({ data: userData, message: "Hello User, Next.js!" });
}
