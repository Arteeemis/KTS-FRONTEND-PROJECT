import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      setQueryParam: action,
    });
  }

  getParam(key: string): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    const value = this._params[key];
    if (Array.isArray(value)) {
      return value.every((item) => typeof item === 'string') ? (value as string[]) : (value as qs.ParsedQs[]);
    }
    return value;
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setQueryParam(key: string, value: string | number | undefined) {
    if (value === undefined) {
      delete this._params[key];
    } else {
      this._params[key] = value.toString();
    }
    this._search = qs.stringify(this._params);
    window.history.replaceState(null, '', `?${this._search}`);
  }

  destroy() {
    // Cleanup logic if needed
  }
}
