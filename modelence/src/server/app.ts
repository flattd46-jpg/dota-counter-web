import { startApp } from 'modelence/server';
import draftsModule from './drafts';

startApp({
  modules: [draftsModule],
});
