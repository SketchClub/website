import Error from "next/error";

export default function index() {
  return (
    <div>
      <div>v1 home</div>
      <Error statusCode={600} />
    </div>
  );
}
