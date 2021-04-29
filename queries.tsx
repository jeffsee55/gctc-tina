const gql = (args) => args;

export const NavFragment = gql`
  fragment navItem on NavItemLink_Data {
    label
    value
  }
  fragment navFragment on Nav_Document {
    __typename
    data {
      ... on Nav_Doc_Data {
        show_auth
        items {
          __typename
          ... on NavItemLink_Data {
            ...navItem
          }
          ... on NavItemPopout_Data {
            label
            children {
              label
              description
              value
              icon
            }
            extra {
              label
              value
              icon
            }
          }
          ... on NavItemMore_Data {
            label
            columns {
              label
              items {
                label
                value
              }
            }
            featured_post {
              sys {
                path
                breadcrumbs(excludeExtension: true)
              }
              data {
                __typename
                ... on Post_Doc_Data {
                  image
                  title
                  preface {
                    raw
                  }
                  author {
                    sys {
                      filename
                    }
                    data {
                      ... on Author_Doc_Data {
                        image
                        name
                      }
                      ... on Athlete_Doc_Data {
                        image
                        name
                      }
                    }
                  }
                }
              }
            }
            read_more {
              label
              value
            }
            from_the_blog {
              sys {
                path
                breadcrumbs(excludeExtension: true)
              }
              data {
                __typename
                ... on Post_Doc_Data {
                  image
                  title
                  preface {
                    raw
                  }
                  author {
                    sys {
                      filename
                    }
                    data {
                      ... on Author_Doc_Data {
                        image
                        name
                      }
                      ... on Athlete_Doc_Data {
                        image
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
