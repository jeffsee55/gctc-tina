import NextLink from "next/link";
import { useRouter } from "next/router";

export const Link = (props: React.ComponentProps<typeof NextLink>) => {
  const { route } = useRouter();
  if (route.startsWith("/admin")) {
    return <NextLink {...props} href={`/admin${props.href}`} />;
  }
  return <NextLink {...props} />;
};
