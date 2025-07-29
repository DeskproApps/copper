import { Company } from "@/services/copper/types"
import { DeskproTheme, Stack, Tag } from "@deskpro/deskpro-ui"

interface CompanyTagsProps {
  theme: DeskproTheme
  tags: NonNullable<Company["tags"]>
}

export function CompanyTags(props: Readonly<CompanyTagsProps>) {
  const { tags, theme } = props

  return (
    <Stack gap={5} style={{ flexWrap: "wrap" }}>
      {tags.map((tag) => {
        const tagStyling = {
          backgroundColor: theme.colors.grey5,
          borderColor: theme.colors.grey20,
          textColor: theme.colors.grey100
        }
        return <Tag key={tag} label={tag} color={tagStyling} />
      })}
    </Stack>
  )
}