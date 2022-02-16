import { useEffect, useState, useCallback, useMemo } from 'react';
import { client } from '@/subgraph/clientManager';
import { DocumentNode } from '@apollo/client';
import useMounted from '@/hooks/useMounted';

const DEFAULT_PAGE_SIZE = 20;

interface PaginationProps {
  gql: DocumentNode;
  view: string;
  disabled?: boolean;
  params?: any;
  size?: number;
}

const sortAsDesc = (a: any, b: any) =>
  Number(b.timestamp) - Number(a.timestamp);

const usePagination = (props: PaginationProps) => {
  const {
    size = DEFAULT_PAGE_SIZE,
    gql,
    view,
    params = {},
    disabled = false,
  } = props;
  const [list, setList] = useState([]);
  const mounted = useMounted();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: size,
    total: DEFAULT_PAGE_SIZE * 50, // TODO unable to calculate the total number
  });

  // fetch data list
  const fetchList = useCallback(async () => {
    let { data } = await client.query({
      query: gql,
      variables: {
        offset: (pagination.current - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        user: '0x743F232Eee66406FDe99Af1E106ed7F32011073d',
        ...params,
      },
    });

    setList(data[view] ? data[view].sort(sortAsDesc) : []);
  }, [pagination, params]);

  // udpate ant pagination
  const position = useMemo(
    () => (pagination.total > pagination.pageSize ? 'bottomRight' : 'none'),
    [pagination],
  );

  // auto fetch
  useEffect(() => {
    // should stop if component unmount
    if (!mounted.current) return;
    // should be disabled
    if (disabled) return;
    fetchList();
  }, [pagination, disabled]);

  // should reset
  useEffect(() => {
    setList([]);
    setPagination({
      current: 1,
      pageSize: size,
      total: DEFAULT_PAGE_SIZE * 50, // TODO unable to calculate the total number
    });
  }, [disabled]);

  return {
    list,
    pagination,
    setList,
    setPagination,
    position,
  };
};

export default usePagination;
