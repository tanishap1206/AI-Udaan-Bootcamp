import Link from 'next/link'

export function TopHeader() {
  return (
    <header className='relative z-50 w-full border-b border-white/20 bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-cyan-500/10'>
      <div className='w-full flex items-center justify-between px-4 md:px-8 py-6 max-w-full'>
        <div className='flex items-center gap-3'>
          <div className='rounded-full border-2 border-white/30 bg-white w-16 h-16 flex items-center justify-center overflow-hidden shadow-lg'>
            <img
              src='/images/logo.png'
              alt='Buddha Institute of Technology logo'
              width={64}
              height={64}
              className='h-full w-full object-contain p-1'
            />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-white lg:text-3xl'>Buddha Institute of Technology</h1>
            <p className='text-base text-cyan-300'>AICTE Approved · BEU Affiliated</p>
            <p className='text-base text-white/70'>Empowering the next generation of AI leaders</p>
          </div>
        </div>

        {/* Navigation */}
        <div className='hidden items-center gap-8 md:flex'>
          <Link href='#home' className='text-xl font-bold text-white transition hover:text-cyan-300'>
            Home
          </Link>
          <Link href='#about' className='text-xl font-bold text-white transition hover:text-cyan-300'>
            About
          </Link>
          <Link href='#contact' className='text-xl font-bold text-white transition hover:text-cyan-300'>
            Contact
          </Link>
          <Link
            href='/enquire'
            className='inline-flex rounded-full bg-cyan-500 hover:bg-cyan-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition'
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  )
}
