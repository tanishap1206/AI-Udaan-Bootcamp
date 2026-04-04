import Link from 'next/link'

export function TopHeader() {
  return (
    <header className='relative z-50 w-full border-b border-white/20 bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-cyan-500/10'>
      <div className='w-full flex items-center justify-between px-4 md:px-8 py-3 max-w-full'>
        <div className='flex items-center gap-2.5'>
          <div className='rounded-full border-2 border-white/30 bg-white w-12 h-12 flex items-center justify-center overflow-hidden shadow-lg'>
            <img
              src='/images/logo.png'
              alt='Buddha Institute of Technology logo'
              width={48}
              height={48}
              className='h-full w-full object-contain p-0.5'
            />
          </div>
          <div>
            <h1 className='text-lg font-bold text-white lg:text-xl leading-tight'>Buddha Institute of Technology</h1>
            <p className='text-xs text-cyan-300 leading-tight'>AICTE Approved · BEU Affiliated</p>
            <p className='text-xs text-white/70 leading-tight'>Empowering the next generation of AI leaders</p>
          </div>
        </div>

        {/* Navigation */}
        <div className='hidden items-center gap-8 md:flex'>
          <Link href='/' className='text-base font-bold text-white transition hover:text-cyan-300 whitespace-nowrap'>
            Home
          </Link>
          <Link href='/#about' className='text-base font-bold text-white transition hover:text-cyan-300 whitespace-nowrap'>
            About
          </Link>
          <Link href='/#questions' className='text-base font-bold text-white transition hover:text-cyan-300 whitespace-nowrap'>
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
