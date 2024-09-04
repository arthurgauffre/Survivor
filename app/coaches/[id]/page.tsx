
import React from 'react'
import SpawnHeadband from '../../SpawnHeadband'


export default function Page({ params }: { params: { id: string } }) {
  return (<SpawnHeadband title={params.id}>
      tkt
    </SpawnHeadband>)
}
