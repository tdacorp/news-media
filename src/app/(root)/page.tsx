import { auth, signIn, signOut } from "../../../auth";


export default async function Home() {
  const session = await auth()

  return (
    <div>
      <h1>welcome to news media</h1>
      <p> we are launcing soon </p>

      <div style={{ padding: "50px" }}>
      {session ? (
        <>
          <h1>Welcome, {session.user?.name}</h1>
          <p>Role: {session.user?.role}</p>
          <form action={async () => { "use server"; await signOut() }}>
            <button style={{ padding: "10px 20px", background: "#333", color: "#fff", cursor: "pointer" }}>
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <form action={async () => { "use server"; await signIn("github") }}>
          <button style={{ padding: "10px 20px", background: "#333", color: "#fff", cursor: "pointer" }}>
            Login with GitHub
          </button>
        </form>
      )}
    </div>
    </div>
  );
}
