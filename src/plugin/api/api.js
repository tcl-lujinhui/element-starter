import _ from 'underscore';

import SIM from './SIM';
import Network from './Network';
import WAN from './WAN';
import Usage from './Usage';
import Tr069 from './Tr069';
import IpFilter from './IpFilter';

var api = {}
_.extend(api,SIM,Network,WAN,Usage,Tr069,IpFilter);
export default api
