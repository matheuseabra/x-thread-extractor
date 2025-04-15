import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <Layout>
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">Contact Us</h1>
                <p className="text-sm text-muted-foreground mt-2">We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="rounded-md border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full md:w-1/2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rounded-md border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="rounded-md border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>
                    <Button type="submit" className="w-full mt-2">Submit</Button>
                </form>
            </div>
        </Layout>
    );
};

export default Contact;