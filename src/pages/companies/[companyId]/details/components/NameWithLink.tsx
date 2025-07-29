import { LinkIcon } from "@deskpro/app-sdk"
import { P1, Stack } from "@deskpro/deskpro-ui"

interface NameWithLinkProps {
  name: string
  link: string
}
export function NameWithLink(props: Readonly<NameWithLinkProps>) {
  const { name, link} = props

  return (
        <Stack gap={5} style={{ flexWrap: "wrap" }}>
            <P1>{name} <LinkIcon href={link}/></P1>
        </Stack>
    )
}