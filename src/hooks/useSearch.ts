import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash-es';

import { useSearchParams } from 'react-router-dom';

export function useSearch<T, K extends keyof T>(items: T[], prop: K): T[] {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const queryString = query.toLowerCase().trim();

  const filterItems = () => {
    const filtered = [...items].filter(item => {
      const valueOfRequiredProp = item[prop];

      if (typeof valueOfRequiredProp === 'string') {
        const minifiedString = valueOfRequiredProp.toLowerCase().trim();

        return minifiedString.includes(`${queryString}`);
      }

      return false;
    });

    return filtered;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilter = useCallback(debounce(setFilteredItems, 300), []);

  useEffect(() => {
    const filtered = filterItems();

    applyFilter(filtered);

    return () => {
      applyFilter.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, items]);

  return filteredItems;
}
