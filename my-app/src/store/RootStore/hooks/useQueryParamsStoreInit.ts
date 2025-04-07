import * as Router from 'react-router-dom';
import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
  try {
    const { search } = Router.useLocation();
    rootStore.query.setSearch(search);
  } catch (error) {
    console.error('useQueryParamsStoreInit must be used within a <Router> context:', error);
  }
};
