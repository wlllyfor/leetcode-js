export interface AlibabaProductFindPageProps {
  params: {
    hub_code: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
    product_id: string;
  };
}
