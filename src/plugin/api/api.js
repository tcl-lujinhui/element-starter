import _ from 'underscore';

import SIM from './SIM';
import Network from './Network';
import WAN from './WAN';
import Usage from './Usage';

var api = {}
_.extend(api,SIM,Network,WAN,Usage);
export default api
