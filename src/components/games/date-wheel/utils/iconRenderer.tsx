
import React from 'react';
import { 
  Film, 
  Pizza, 
  Moon, 
  Paintbrush, 
  Heart, 
  Home, 
  MapPin, 
  Mountain, 
  Sun, 
  Music, 
  Eye, 
  Coffee, 
  Utensils, 
  Star, 
  MessageCircle, 
  Calendar,
  Book,
  ShoppingBag,
  Gift,
  Camera,
  Clock,
  HandHelping,
  Wine,
  PaintRoller
} from 'lucide-react';

export const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'Film':
      return <Film className="h-6 w-6 text-midnight-indigo" />;
    case 'Pizza':
      return <Pizza className="h-6 w-6 text-midnight-indigo" />;
    case 'Moon':
      return <Moon className="h-6 w-6 text-midnight-indigo" />;
    case 'Paintbrush':
      return <Paintbrush className="h-6 w-6 text-midnight-indigo" />;
    case 'MapPin':
      return <MapPin className="h-6 w-6 text-midnight-indigo" />;
    case 'Sun':
      return <Sun className="h-6 w-6 text-midnight-indigo" />;
    case 'Heart':
      return <Heart className="h-6 w-6 text-midnight-indigo" />;
    case 'Mountain':
      return <Mountain className="h-6 w-6 text-midnight-indigo" />;
    case 'Home':
      return <Home className="h-6 w-6 text-midnight-indigo" />;
    case 'Music':
      return <Music className="h-6 w-6 text-midnight-indigo" />;
    case 'Eye':
      return <Eye className="h-6 w-6 text-midnight-indigo" />;
    case 'Coffee':
      return <Coffee className="h-6 w-6 text-midnight-indigo" />;
    case 'Utensils':
      return <Utensils className="h-6 w-6 text-midnight-indigo" />;
    case 'Star':
      return <Star className="h-6 w-6 text-midnight-indigo" />;
    case 'MessageCircle':
      return <MessageCircle className="h-6 w-6 text-midnight-indigo" />;
    case 'Calendar':
      return <Calendar className="h-6 w-6 text-midnight-indigo" />;
    case 'Book':
      return <Book className="h-6 w-6 text-midnight-indigo" />;
    case 'ShoppingBag':
      return <ShoppingBag className="h-6 w-6 text-midnight-indigo" />;
    case 'Gift':
      return <Gift className="h-6 w-6 text-midnight-indigo" />;
    case 'Camera':
      return <Camera className="h-6 w-6 text-midnight-indigo" />;
    case 'Clock':
      return <Clock className="h-6 w-6 text-midnight-indigo" />;
    case 'HandHelping':
      return <HandHelping className="h-6 w-6 text-midnight-indigo" />;
    case 'Wine':
      return <Wine className="h-6 w-6 text-midnight-indigo" />;
    case 'PaintRoller':
      return <PaintRoller className="h-6 w-6 text-midnight-indigo" />;
    default:
      return <Heart className="h-6 w-6 text-midnight-indigo" />;
  }
};
