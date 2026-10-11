
export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-secondary/30 bg-white p-8 shadow-lg sm:p-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-sm">
                        S
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to your SmartNote account
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-700">
                         Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-secondary/40 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"/>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-secondary/40 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"/>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-secondary hover:text-gray-900 active:scale-[0.98]">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
