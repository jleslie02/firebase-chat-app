import logoX from "../assets/logos/x_logo.png";
import hangtag from '../assets/images/hangtag.svg';
import divider_login from "../assets/images/divider_login.png"
import bgwelcome from "../assets/images/bg-welcome.jpg"
import exit from '../assets/images/exit.svg'
import bell from '../assets/images/bell.svg'
import hr_lol from '../assets/images/hr_lol.png'
import online from '../assets/images/online.png'
import smoke from '../assets/images/smoke-10.png'
import sprites from '../assets/images/sprites.png'
import skins from '../assets/images/skin_profiles.png'
import me from '../assets/images/me.jpg'
import paperclip from '../assets/images/paperclip.svg'
import sidedivider from '../assets/images/divider-download.png'

export const routes = {
  loginPath: () => '/login',
  logoutPath: () => '/logout',
  homePath: () => '/home',
  productsPath: () => '/products',
  productPath: (productId = '') => `/products/${productId}`,
  editPath: (productId) => `${routes.productPath(productId)}/edit`,
  brandPath: (brandId = '') => `/brands/${brandId}`,
  logos: {
    logoX: logoX
  },
  images: {
    hangtag: hangtag,
    mainDivider: divider_login,
    bgwelcome: bgwelcome,
    bell: bell,
    sprites: sprites,
    exit: exit,
    online: online,
    smoke: smoke,
    lolDivider: hr_lol,
    skinsProfile: skins,
    me: me,
    paperclip: paperclip,
    sidedivider: sidedivider
  }
};
