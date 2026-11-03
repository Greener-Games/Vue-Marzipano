import VueMarzipano from './VueMarzipano';

import MarzipanoViewer from './Views/MarzipanoViewer.vue';

import AutoRotateButton from './Components/Buttons/AutoRotateButton.vue';
import FullscreenButton from './Components/Buttons/FullscreenButton.vue';
import Hotspot from './Components/MarzipanoHotspot.vue';
import NavigateButton from './Components/Buttons/NavigateButton.vue';
import NavigationHotspot from './Components/Hotspots/NavigationHotspot.vue';
import SceneList from './Components/SceneList.vue';
import TitleBar from './Components/TitleBar.vue';
import VueMarzipanoButton from './Components/VueMarzipanoButton.vue';
import { useMarzipano } from './composables/useMarzipano';
import { useMarzipanoContext } from './context';

import { findEnvVariableByKey, GetImage, generateGUID, updateHotspots } from './helpers';

import './style.css';

export { VueMarzipano as default };
export {
  MarzipanoViewer,
  AutoRotateButton,
  FullscreenButton,
  Hotspot,
  NavigateButton,
  NavigationHotspot,
  SceneList,
  TitleBar,
  VueMarzipanoButton,
  useMarzipano,
  useMarzipanoContext,
};

export { VueMarzipano, findEnvVariableByKey, GetImage, generateGUID, updateHotspots };

export type { MarzipanoContext, MarzipanoViewFunctions } from './context';
export type * from './types';
