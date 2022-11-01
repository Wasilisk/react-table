import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Table, Paper } from "shared/ui";

import { CLUB_DATA } from "shared/config/mock-data";
import { timeConverter } from 'shared/libs';
import { Button } from '@mui/material';
import { useState } from 'react';

export const Home = () => {
  const [listData, setListData] = useState(CLUB_DATA);

  return (
    <Paper>
      <Table
        title="Clubs"
        headerActions={[
          {
            tooltip: "Add item",
            icon: <NoteAddIcon />,
            onClick: () => setListData([{
              id: listData.length + 1,
              clubname: "Kyiv",
              sportType: "Basketball",
              country: "Ukraine",
              status: "unactive",
              createdAt: Date.now().toString().slice(0,-3),
              editedAt: Date.now().toString().slice(0,-3)
            }, ...listData])
          },
          {
            tooltip: "Refresh items",
            icon: <RefreshIcon />,
            onClick: () => setListData(CLUB_DATA)
          }
        ]}
        listData={listData}
        totalCount={listData.length}
        rowsPerPageOptions={[5, 10, 15]}
        itemsOnPage={10}
        itemActions={[
          {
            name: "Delete",
            onClick: ({ id }) => setListData(listData.filter(data => data.id !== id))
          },
          {
            component: <Button variant="outlined">Delete</Button>,
            onClick: ({ id }) => setListData(listData.filter(data => data.id !== id))
          }
        ]}
        columns={[
          {
            body: {
              key: "clubname",
            },
            head: {
              name: "Clubname",
            }
          },
          {
            body: {
              key: "sportType",
            },
            head: {
              name: "Sport Type",
            }
          },
          {
            body: {
              key: "country",
            },
            head: {
              name: "Country",
            }
          },
          {
            body: {
              key: "status",
            },
            head: {
              name: "Status",
              type: "filter",
              options: [
                {
                  id: "active",
                  name: "Active",
                },
                {
                  id: "unactive",
                  name: "Unactive",
                }
              ]
            }
          },
          {
            body: {
              key: "createdAt",
              transform: (timestamp) => timeConverter(timestamp)
            },
            head: {
              name: "Created At",
              type: "sort"
            }
          },
          {
            body: {
              key: "editedAt",
              transform: (timestamp) => timeConverter(timestamp)
            },
            head: {
              name: "Edited At",
              type: "sort"
            }
          }
        ]}
      />
    </Paper>
  )
}