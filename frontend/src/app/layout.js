import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Service Request Board',
  description: 'Find tradespeople for your home service needs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}