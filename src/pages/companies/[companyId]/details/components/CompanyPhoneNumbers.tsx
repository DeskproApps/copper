import { Company } from "@/services/copper/types";
import { P1, Stack } from "@deskpro/deskpro-ui";

export function CompanyPhoneNumbers(props: Readonly<{ numbers: Company["phone_numbers"] }>) {
  const { numbers } = props
  return (
    <Stack gap={5} style={{ flexWrap: "wrap" }}>
      {numbers.map((item, index) => (
        <P1 key={item.number} title={item.category}>
          {item.number}{index < numbers.length - 1 ? "," : ""}
        </P1>
      ))}
    </Stack>
  )
}