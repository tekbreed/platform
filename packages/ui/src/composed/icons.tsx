import {
  type LucideIcon,
  Info,
  XCircle,
  Bold,
  Italic,
  Strikethrough,
  Code2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading4,
  Heading5,
  Mail,
  AlertTriangle,
  Trophy,
  Bot,
  UserPen,
  DoorClosed,
  Send,
  FileText,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Building2,
  Users,
  ExternalLink,
  Package,
  ShoppingCart,
  Shirt,
  PenTool,
  Monitor,
  Laptop,
  Headphones,
  Mouse,
  Keyboard,
  Camera,
  Palette,
  Gift,
  Search,
  Filter,
  Plus,
  Minus,
  CreditCard,
  Truck,
  RefreshCw,
  Check,
  Circle,
  Loader,
  Loader2,
  BookOpen,
  Code,
  Zap,
  SunMedium,
  Moon,
  Star,
  Clock,
  BarChart,
  CheckCircle,
  Play,
  Lightbulb,
  Sparkles,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  close: X,
  spinner: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  ),
  chevronLeft: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-left"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),

  github: () => (
    <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736 15.166 259.057 5.365 219.271 5.365c-39.781 0-76.472 9.804-110.063 29.408c-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906c27.884 38.164 63.906 64.572 108.063 79.227c5.14.954 8.945.283 11.419-1.996c2.475-2.282 3.711-5.14 3.711-8.562c0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1c-6.374-.089-12.991-.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997c-.572-1.335-.098-2.43 1.427-3.289c1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851c5.614 3.806 10.229 8.754 13.846 14.842c4.38 7.806 9.657 13.754 15.846 17.847c6.184 4.093 12.419 6.136 18.699 6.136c6.28 0 11.704-.476 16.274-1.423c4.565-.952 8.848-2.383 12.847-4.285c1.713-12.758 6.377-22.559 13.988-29.41c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035 7.52-42.637 22.557-58.817c-7.044-17.318-6.379-36.732 1.997-58.24c5.52-1.715 13.706-.428 24.554 3.853c10.85 4.283 18.794 7.952 23.84 10.994c5.046 3.041 9.089 5.618 12.135 7.708c17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565c10.088-3.805 17.802-4.853 23.134-3.138c8.562 21.509 9.325 40.922 2.279 58.24c15.036 16.18 22.559 35.787 22.559 58.817c0 16.178-1.958 30.497-5.853 42.966c-3.9 12.471-8.941 22.457-15.125 29.979c-6.191 7.521-13.901 13.85-23.131 18.986c-9.232 5.14-18.182 8.85-26.84 11.136c-8.662 2.286-18.415 4.004-29.263 5.146c9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562c2.379 2.279 6.136 2.95 11.276 1.995c44.163-14.653 80.185-41.062 108.068-79.226c27.88-38.161 41.825-81.126 41.825-128.906c-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 1200 1227" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
      />
    </svg>
  ),
  linkedIn: () => (
    <svg viewBox="0 0 448 512" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 01107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
      />
    </svg>
  ),
  youtube: () => (
    <svg viewBox="0 0 576 512" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288.001 64 288.001 64s-170.779 0-213.37 11.486c-23.497 6.321-42.003 24.947-48.284 48.597C16 166.733 16 256.001 16 256.001s0 89.269 10.347 131.918c6.281 23.65 24.787 42.276 48.284 48.597C117.222 448 288.001 448 288.001 448s170.779 0 213.37-11.486c23.497-6.321 42.003-24.947 48.284-48.597C560 345.27 560 256.001 560 256.001s0-89.268-10.345-131.918zM232.001 334.059V177.944l142.745 78.057L232.001 334.059z"
      />
    </svg>
  ),
  discord: () => (
    <svg
      className="h-5 w-5"
      viewBox="0 0 71 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
      />
    </svg>
  ),
  info: Info,
  xCircle: XCircle,
  bold: Bold,
  italic: Italic,
  strikeThrough: Strikethrough,
  code2: Code2,
  heading3: Heading3,
  heading4: Heading4,
  heading5: Heading5,
  list: List,
  listOrdered: ListOrdered,
  quote: Quote,
  undo: Undo,
  redo: Redo,
  trophy: Trophy,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  menu: Menu,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  mail: Mail,
  alertTriangle: AlertTriangle,
  bot: Bot,
  send: Send,
  fileText: FileText,
  bookOpen: BookOpen,
  code: Code,
  zap: Zap,
  briefcase: Briefcase,
  mapPin: MapPin,
  dollarSign: DollarSign,
  building2: Building2,
  users: Users,
  externalLink: ExternalLink,
  package: Package,
  shoppingCart: ShoppingCart,
  shirt: Shirt,
  penTool: PenTool,
  monitor: Monitor,
  headphones: Headphones,
  mouse: Mouse,
  keyboard: Keyboard,
  camera: Camera,
  palette: Palette,
  gift: Gift,
  search: Search,
  filter: Filter,
  plus: Plus,
  minus: Minus,
  creditCard: CreditCard,
  truck: Truck,
  refreshCw: RefreshCw,
  check: Check,
  circle: Circle,
  loader: Loader,
  loader2: Loader2,
  star: Star,
  clock: Clock,
  barChart: BarChart,
  checkCircle: CheckCircle,
  play: Play,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  doorClosed: DoorClosed,
  userPen: UserPen,
  x: X,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowBigLeft: ArrowBigLeft,
  arrowBigRight: ArrowBigRight,
  home: Home,
};
