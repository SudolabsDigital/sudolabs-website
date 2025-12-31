import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4">
         {/* Glow Effect */}
         <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
         
         {/* Animated Logo */}
         <div className="relative z-10">
            <Image 
              src="/assets/logo-symbol.svg" 
              width={64} 
              height={64} 
              alt="Cargando..." 
              className="animate-pulse"
              priority
            />
         </div>
         
         {/* Text */}
         <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase animate-pulse">
            Sudolabs
         </span>
      </div>
    </div>
  )
}