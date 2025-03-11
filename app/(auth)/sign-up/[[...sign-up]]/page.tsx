import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-sm normal-case"
          }
        }}
      />
    </div>
  )
}

export default SignUpPage;