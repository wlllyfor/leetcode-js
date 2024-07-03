export interface HasHubCodeAndTokenPageProps {
  params: {
    hub_code: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
    token: string;
  };
}
