import $ from 'jquery';
import _ from 'underscore';
import vuex from './vuex.js';
import _config from './config.js';
import G from './config/G.js';
import countryCode from './config/countryCode.js';
import units from './plugin/units.js';

exports.$ = $;
exports.vuex = vuex;
exports._config = _config;
exports.G = G;
exports._ = _;
exports.units = units;
exports.countryCode=countryCode;
