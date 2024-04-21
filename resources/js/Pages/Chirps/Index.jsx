import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, subtitle }) {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [errors, setErros] = useState({});
    const [processing, setProcessing] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);
        axios
            .post(route("chirps.store"), { message, name })
            .then((res) => {
                setMessage("");
                setErros({});
                setProcessing(false);
            })
            .catch((error) => {
                setProcessing(false);
                if (error.response.status === 422) {
                    setErros(error.response.data.errors);
                    return;
                }

                console.log(error.response.data.message);
            });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {subtitle}
                </h2>
            }
        >
            <Head title="Chirps" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                <textarea
                                    rows="4"
                                    className="mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <InputError
                                    message={errors.message}
                                ></InputError>
                                <PrimaryButton
                                    disabled={processing}
                                    className="mt-3"
                                >
                                    {processing ? "Enviando..." : "Chirp"}
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
