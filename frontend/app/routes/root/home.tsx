import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub — Project Management Made Beautiful" },
    {
      name: "description",
      content:
        "TaskHub is a modern project management platform. Manage tasks, collaborate with your team, and track progress with beautiful analytics.",
    },
  ];
}

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 animate-blob" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-violet-500/10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-cyan-500/8 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 lg:px-20 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">TaskHub</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/sign-in">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-6 shadow-lg shadow-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-white/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-20 sm:pt-28 pb-20 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now available for teams of all sizes
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Manage Projects
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            TaskHub brings your team together with powerful task management,
            real-time collaboration, and beautiful analytics — all in one
            seamless platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-primary text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 hover:scale-105 group"
              >
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          {[
            { value: "10K+", label: "Tasks Managed" },
            { value: "500+", label: "Active Teams" },
            { value: "99.9%", label: "Uptime" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 hover-lift cursor-default">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Ship Faster
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Powerful features designed to streamline your workflow and boost
            team productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: LayoutDashboard,
              title: "Smart Dashboards",
              desc: "Get a bird's-eye view of all your projects with real-time stats, charts, and progress tracking.",
              gradient: "from-indigo-500 to-blue-600",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              desc: "Invite members, assign tasks, and communicate seamlessly within workspaces.",
              gradient: "from-violet-500 to-purple-600",
            },
            {
              icon: BarChart3,
              title: "Analytics & Reports",
              desc: "Beautiful charts showing task trends, priority distributions, and team productivity.",
              gradient: "from-cyan-500 to-teal-600",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-8 hover-lift group cursor-default"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TaskHub */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-24">
        <div className="glass rounded-3xl p-10 sm:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Teams Choose TaskHub
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Built for modern teams who demand speed, clarity, and beautiful tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Instant page loads with optimized SPA architecture",
              },
              {
                icon: Shield,
                title: "Secure",
                desc: "Enterprise-grade security with encrypted data",
              },
              {
                icon: Clock,
                title: "Real-time",
                desc: "Live updates across all team members instantly",
              },
              {
                icon: CheckCircle2,
                title: "Reliable",
                desc: "99.9% uptime with automatic backups",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Workflow?
          </span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of teams already using TaskHub to ship faster and
          collaborate better.
        </p>
        <Link to="/sign-up">
          <Button
            size="lg"
            className="bg-white text-gray-900 font-semibold px-10 py-6 text-lg rounded-xl shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-105"
          >
            Get Started — It's Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 sm:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">TaskHub</span>
          </div>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} TaskHub. Built for productive teams.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
