import {
  ExternalIconLink,
  H1,
  H2,
  H3,
  P5,
  Property,
  Stack,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { Avatar } from "@deskpro/deskpro-ui";

import { ReactElement } from "react";
import { StyledLink } from "../../styles";
import { IJson } from "../../types/json";
import { mapFieldValues } from "../../utils/mapFieldValues";
import { PropertyRow } from "../PropertyRow/PropertyRow";
import { Logo } from "../Logo/Logo";
import { HorizontalDivider } from "../HorizontalDivider/HorizontalDivider";
import { timeSince } from "../../utils/utils";

const SpaceBetweenFields = ({
  field: field,
}: {
  field: {
    key: string | number;
    value: string | number | ReactElement;
  };
}) => {
  return (
    <Stack
      style={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <H1>{field.key}:</H1>
      <H1>{field.value}</H1>
    </Stack>
  );
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[];
  internalUrl?: string;
  externalUrl?: string;
  metadata: IJson["view"];
  idKey?: string;
  internalChildUrl?: string;
  externalChildUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childTitleAccessor?: (field: any, i: number) => string;
  title?: string;
};

export const FieldMapping = ({
  fields,
  externalUrl,
  internalUrl,
  metadata,
  idKey = "",
  internalChildUrl,
  externalChildUrl,
  childTitleAccessor,
  title,
}: Props) => {
  const { theme } = useDeskproAppTheme();

  return (
    <Stack vertical gap={5} style={{ width: "100%" }}>
      {title || internalUrl || externalUrl ? (
        <Stack
          style={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          {title && internalUrl ? (
            <StyledLink title="title" to={internalUrl + fields[0][idKey]}>
              {title}
            </StyledLink>
          ) : (
            title && <H1>{`${title} (${fields.length})`}</H1>
          )}
          {externalUrl && (
            <ExternalIconLink
              href={externalUrl}
              icon={<Logo />}
            ></ExternalIconLink>
          )}
        </Stack>
      ) : (
        <div></div>
      )}
      {fields.map((field, i) => (
        <Stack vertical style={{ width: "100%" }} gap={10} key={i}>
          {(internalChildUrl || childTitleAccessor || externalChildUrl) && (
            <Stack
              style={{
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {internalChildUrl && childTitleAccessor && (
                <StyledLink to={internalChildUrl + field[idKey]}>
                  {childTitleAccessor(field, i)}
                </StyledLink>
              )}
              {!internalChildUrl && childTitleAccessor && (
                <H3>{childTitleAccessor(field, i)}</H3>
              )}
              {externalChildUrl && (
                <ExternalIconLink
                  href={
                    "https://app.copper.com/companies/" +
                    externalChildUrl +
                    field[idKey]
                  }
                  icon={<Logo />}
                ></ExternalIconLink>
              )}
            </Stack>
          )}
          {metadata?.map((metadataFields, i) => {
            const usableFields = mapFieldValues(metadataFields, field);

            switch (usableFields.length) {
              case 1:
                if (!usableFields[0].value) return;

                return metadataFields.some((e) => e.format === "horizontal") ? (
                  <Stack justify="space-between" style={{ width: "100%" }}>
                    <H1 style={{ fontSize: "14px" }}>{usableFields[0].key}</H1>
                    <H1 style={{ fontSize: "14px" }}>
                      {usableFields[0].value}
                    </H1>
                  </Stack>
                ) : (
                  <Stack vertical gap={4} key={i} style={{ width: "100%" }}>
                    <H2 style={{ color: theme?.colors.grey80 }}>
                      {usableFields[0].key}
                    </H2>
                    <P5 style={{ whiteSpace: "pre-line", width: "100%" }}>
                      {usableFields[0].value}
                    </P5>
                  </Stack>
                );

              case 3:
                return (
                  <Stack
                    style={{ justifyContent: "space-between", width: "100%" }}
                    key={i}
                  >
                    <Stack key={i} vertical gap={5}>
                      <Stack
                        style={{ alignItems: "flex-start", marginTop: "10px" }}
                      >
                        <Stack
                          vertical
                          gap={3}
                          style={{
                            marginLeft: "5px",
                            alignItems: "center",
                          }}
                        >
                          <Avatar size={22} name="David Pinto"></Avatar>
                          <H2>
                            {timeSince(
                              new Date(usableFields[1].value as number)
                            )}
                          </H2>
                        </Stack>
                        <div style={{ maxWidth: "20ch", marginLeft: "10px" }}>
                          <H2>{usableFields[2].value}</H2>
                        </div>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              case 4:
              case 2:
                return (
                  <Stack style={{ width: "100%" }} vertical gap={5} key={i}>
                    <PropertyRow key={i}>
                      {usableFields
                        .filter((_, i) => i !== 2)
                        .map((e, ii) => (
                          <Property title={e.key as string} key={ii}>
                            <P5>{e.value != null ? e.value : "-"}</P5>
                          </Property>
                        ))}
                    </PropertyRow>
                  </Stack>
                );

              default:
                return (
                  <Stack gap={20} vertical style={{ width: "100%" }} key={i}>
                    {usableFields
                      .filter((e) => e.key)
                      .map((usableField, usableFieldI) => (
                        <Stack
                          vertical
                          style={{ width: "100%" }}
                          key={usableFieldI}
                        >
                          <SpaceBetweenFields
                            field={usableField}
                          ></SpaceBetweenFields>
                        </Stack>
                      ))}
                  </Stack>
                );
            }
          })}
          <HorizontalDivider full={i === fields.length - 1} />
        </Stack>
      ))}
    </Stack>
  );
};
