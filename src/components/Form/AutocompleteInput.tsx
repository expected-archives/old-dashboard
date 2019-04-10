import { styled, theme } from "../../style"
import { Input } from "./Input";

import React, { ChangeEvent, FocusEventHandler, KeyboardEventHandler, useEffect, useState } from "react";

const AutocompleteInput = styled(Input)`
`

const AutocompleteItems = styled.div`
  margin-top: 10px;
  border-radius: 0.25rem;
  position: absolute;
  z-index: 99;
  border: 1px solid ${theme.color.grey};
`

const AutocompleteItem = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  :hover{
    background: ${theme.color.grey};
  }
`

type event = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

interface IProps {
  suggestions: string[]
  tags?: boolean,
  onChange: (event: event) => void
  name: string
}

export default ({ name, onChange, suggestions, tags = false }: IProps) => {

  const [completions, setCompletions] = useState<string[]>([])
  const [value, setValue] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const blur = (_: any) => hide()
    document.addEventListener("click", blur)
    return () => document.removeEventListener("click", blur)
  })

  const change = (e: event) => {
    setValue(e.target.value)
    setCompletions(suggestions.filter(x => e.target.value.length > 0 && x.startsWith(e.target.value)))
    onChange(e)
  }

  const select = (val: string) => {
    setValue(val);
    hide()
  }

  const hide = () => {
    setSelectedIndex(-1)
    setCompletions([])
  }


  const key = (e: any) => {
    const down = () => setSelectedIndex(selectedIndex + 1 > completions.length - 1 ? 0 : selectedIndex + 1)
    const up = () => setSelectedIndex(selectedIndex + 1 > completions.length - 1 ? 0 : selectedIndex + 1)

    if (e.keyCode === 27) hide()
    else if (e.keyCode === 40) down()
    else if (e.keyCode === 38) up()
    else if (e.keyCode === 13) {
      e.preventDefault()
      select(completions[selectedIndex])
    }

  }

  return (
    <div onKeyDown={key}>
      <AutocompleteInput value={value} name={name} onChange={change} autoComplete="off"/>
      {
        completions.length > 0
          ?
          <AutocompleteItems>
            {completions.map((val, index) => {
              if (index !== selectedIndex)
                return (<AutocompleteItem onClick={(_) => select(val)} key={index}>{val}</AutocompleteItem>)
              else
                return (<AutocompleteItem onClick={(_) => select(val)}
                                          style={{ background: theme.color.grey}} key={index}>{val}</AutocompleteItem>)
              }
            )}
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

