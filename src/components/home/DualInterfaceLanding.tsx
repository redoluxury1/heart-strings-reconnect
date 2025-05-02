
import React from 'react';
import { useInterface } from '../common/InterfaceProvider';

const DualInterfaceLanding = () => {
  const { isEmotional } = useInterface();
  
  return (
    <div className="text-center pt-20 pb-12 md:py-20">
      <h1 className={`font-cormorant text-4xl md:text-5xl lg:text-6xl font-medium mb-5 ${
        isEmotional ? 'text-midnight-indigo' : 'text-slate-800'
      }`}>
        {isEmotional 
          ? "Finally, an app that teaches you when to feed her and tell her she's pretty."
          : "Finally, an app that helps her understand I don't hate her. I'm just hungry."
        }
      </h1>
      
      <p className={`text-xl max-w-2xl mx-auto ${isEmotional ? 'text-midnight-indigo/80' : 'text-slate-600'}`}>
        {isEmotional 
          ? "And also how to stop turning every disagreement into a silent standoff. We can help with that."
          : "Also: tired, overstimulated, and forgetting how to use my words. We can help with that."
        }
      </p>
    </div>
  );
};

export default DualInterfaceLanding;
