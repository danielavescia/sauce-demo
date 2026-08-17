import { register as registerCypressGrep } from '@cypress/grep';
import './commands/login.commands.js';
import './commands/catalog.commands.js';
import './commands/checkout.commands.js';
import './commands/cart.commands.js';
import './commands/logout.commands.js';

registerCypressGrep();
