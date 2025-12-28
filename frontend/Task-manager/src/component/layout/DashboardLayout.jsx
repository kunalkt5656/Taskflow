import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-purple-50/30">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
                    {/* Navbar */}
                    <Navbar onMenuClick={() => setSidebarOpen(true)} />

                    {/* Page Content */}
                    <main className="flex-1 p-4 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-4 px-4 lg:px-8 border-t border-gray-100 bg-white/50">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
                            <p>© 2025 TaskFlow. All rights reserved.</p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
