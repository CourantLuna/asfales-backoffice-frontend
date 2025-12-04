import React from 'react';

export default function Page() {
   return (
       <div>
             {/* Background overlay */}
   <div
  className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none"
  style={{
    backgroundImage: `url('https://wfcc6kelz9zexsot.public.blob.vercel-storage.com/Firefly%20la%20vista%20es%20desde%20encima%20de%20las%20nubes%2C%20vista%20desde%20un%20avion%2C%20en%20la%20toma%20hay%20nubes%20por%20arriba%20%281%29-OhzihO4aGu38K4tHjMwiVAhWXOLcPP.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-slate-400/85 backdrop-blur-sm" />
</div>
       </div>
   );
}