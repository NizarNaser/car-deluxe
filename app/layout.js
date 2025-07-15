
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const outfit = Outfit({
  subsets: ["latin"],weight:["400","500","600","700"]
});


export const metadata = {
  title: "Car Deluxe",
  description: "Wir bieten die besten Gebrauchtwagen mit garantierter QualitätAn- und Verkauf von Gebrauchtwagen Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen. Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
      <Providers>
      {children}
      </Providers>
      
         
            
          
          
      
      </body>
    </html>
  );
}
