import { useSearchParams } from "react-router-dom";

const useQueryString = (): {
  getQuery: typeof getQuery;
  setQuery: typeof setQuery;
  removeQuery: typeof removeQuery;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQuery = (
    _name: string | string[]
  ): Record<string, string | null> => {
    if (Array.isArray(_name)) {
      const names: string[] = Array.isArray(_name) ? _name : [_name];
      const result = Object.create({});
      names.forEach((_name: string) => {
        result[_name] = searchParams.get(_name);
      });
      return result;
    } else {
      return { [_name]: searchParams.get(_name) };
    }
  };

  const setQuery = (_data: { [key: string]: string }) => {
    const keys = Object.keys(_data);
    keys.forEach((key) => {
      searchParams.set(key, _data[key]);
    });
    setSearchParams(searchParams, { replace: true });
    return true;
  };

  const removeQuery = (_name: string | string[]) => {
    const names: string[] = Array.isArray(_name) ? _name : [_name];
    names.forEach((_name) => {
      searchParams.delete(_name);
    });
    setSearchParams(searchParams);
    return true;
  };

  return { getQuery, setQuery, removeQuery };
};

export default useQueryString;
