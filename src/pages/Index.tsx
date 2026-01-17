import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageSquare,
  Image,
  Code,
  Shield,
  Zap,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import golemLogo from "@/assets/golem-logo.png";

const features = [
  {
    icon: MessageSquare,
    title: "Percakapan Natural",
    description: "Berinteraksi dengan AI yang sopan dan responsif, memahami konteks dengan baik.",
  },
  {
    icon: Image,
    title: "Upload Gambar",
    description: "Kirim gambar dan dapatkan analisis, penjelasan, atau bantuan terkait visual.",
  },
  {
    icon: Code,
    title: "Dukungan Kode",
    description: "Syntax highlighting, copy, dan download untuk semua bahasa pemrograman.",
  },
  {
    icon: Shield,
    title: "Privasi Terjaga",
    description: "Riwayat chat tersimpan lokal di perangkat Anda, tidak di server kami.",
  },
  {
    icon: Zap,
    title: "Respons Cepat",
    description: "Streaming real-time memberikan pengalaman chat yang mulus dan responsif.",
  },
  {
    icon: Sparkles,
    title: "Markdown Support",
    description: "Tampilan teks terformat dengan baik termasuk tabel, list, dan quote.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={golemLogo} alt="Golem AI" className="w-10 h-10 rounded-xl" />
            <span className="text-xl font-bold">Golem AI</span>
          </div>
          <Link to="/chat">
            <Button className="gap-2">
              Mulai Chat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              <img
                src={golemLogo}
                alt="Golem AI"
                className="w-32 h-32 mx-auto rounded-3xl glow-effect float-animation"
              />
              <div className="absolute inset-0 rounded-3xl animate-pulse-ring border-2 border-primary/30" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Golem AI</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Asisten AI cerdas yang sopan, ramah, dan siap membantu Anda 
              dengan berbagai pertanyaan dan tugas sehari-hari.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/chat">
                <Button size="lg" className="gap-2 text-lg px-8 hover-glow">
                  <MessageSquare className="w-5 h-5" />
                  Mulai Percakapan
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                Pelajari Lebih Lanjut
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Fitur <span className="gradient-text">Unggulan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dirancang untuk memberikan pengalaman chat AI terbaik dengan berbagai fitur canggih
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover-glow transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-24 relative bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-primary-foreground">S</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dikembangkan oleh <span className="gradient-text">Stoky</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Golem AI dikembangkan dengan penuh dedikasi untuk memberikan pengalaman 
              interaksi AI yang terbaik bagi pengguna. Menggunakan teknologi Google AI Studio 
              untuk memberikan respons yang cerdas dan kontekstual.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Twitter className="w-5 h-5" />
                Twitter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Siap Untuk Memulai?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Mulai percakapan dengan Golem AI sekarang dan rasakan 
              pengalaman berinteraksi dengan AI yang sopan dan membantu.
            </p>
            <Link to="/chat">
              <Button size="lg" className="gap-2 text-lg px-8 hover-glow">
                <Sparkles className="w-5 h-5" />
                Mulai Sekarang - Gratis!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={golemLogo} alt="Golem AI" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold">Golem AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Golem AI. Dikembangkan oleh Stoky.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
