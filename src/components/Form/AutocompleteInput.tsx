import { styled, theme } from "../../style"
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react"
import { Input } from "./index"

const AutocompleteInput = styled(Input)``

const AutocompleteItems = styled.div`
  margin-top: 10px;
  border-radius: 0.25rem;
  position: absolute;
  display: block;
  z-index: 99;
  border: 1px solid ${theme.color.grey};
  width: 100%;
`

const AutocompleteItem = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  :hover{
    background: ${theme.color.grey};
  }
`

interface IProps {
  suggestions: string[]
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  name: string,
  placeholder?: string,
  defaultTags?: string[],
  suggestionRender?: (suggest: string) => ReactNode
}

const defaultSuggestionRender = (suggest: string) => {
  return <>{suggest}</>
}

export default ({ name, onChange, suggestions, placeholder = "", suggestionRender = defaultSuggestionRender }: IProps) => {

  const [completions, setCompletions] = useState<string[]>([])
  const [value, setValue] = useState("")
  const [completionIndex, setCompletionIndex] = useState(-1)

  const [id] = useState('_' + Math.random().toString(36).substr(2, 9))

  useEffect(() => {
    const focusOut = (event: any) => {
      hideCompletion()
      event.preventDefault()
    }
    document.addEventListener("click", focusOut)
    window.addEventListener("resize", focusOut)
    return () => {
      document.removeEventListener("click", focusOut)
      window.removeEventListener("resize", focusOut)
    }
  })


  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
    setCompletions(suggestions
      .filter(x => e.target.value.length > 0 && x.startsWith(e.target.value))
      .slice(0, 5))
    onChange(e)
  }

  const clean = () => {
    setValue("")
  }

  const select = (val: string) => {
    setValue(val)
    onChange({target: { value: val,  name}} as any)
    hideCompletion()
  }

  const hideCompletion = () => {
    setCompletionIndex(-1)
    setCompletions([])
  }

  const clickCompletion = (e: any, completion: string) => {
    e.preventDefault()
    select(completion)
    clean()
    hideCompletion()
    focusInput()
  }

  const focusInput = () => {
    const input = document.getElementById(id)
    if (input) return input.focus()
  }


  const key = (e: any) => {

    const completionDown = () => setCompletionIndex(completionIndex + 1 > completions.length - 1 ? 0 : completionIndex + 1)
    const completionUp = () => setCompletionIndex(completionIndex - 1 < 0 ? completions.length - 1 : completionIndex - 1)

    if (e.keyCode === 13) e.preventDefault()

    if (e.keyCode === 27 || e.keyCode === 9) {
      hideCompletion()
    } else if (e.keyCode === 40) completionDown()
    else if (e.keyCode === 38) completionUp()
    else if (e.keyCode === 13 && completionIndex !== -1) select(completions[completionIndex])
    else if (e.keyCode === 13 && value.trim().length > 0 && completionIndex === -1) {
      select(value)
      clean()
    }
  }

  const sizeOfInput = () => {
    const d = document.getElementById(id)
    if (d) return d.offsetWidth + "px"
    else return '100%'
  }

  return (
    <div onKeyDown={key}>
      <AutocompleteInput id={id} type="text" placeholder={placeholder} name={name} value={value} onChange={change}
                         autoComplete="off"/>
      {
        completions.length > 0
          ?
          <AutocompleteItems style={{ width: sizeOfInput() }}>
            {completions.map((val, index) =>
              (<AutocompleteItem className={"autocomplete-item"}
                                 style={index !== completionIndex ? {} : { background: theme.color.grey }}
                                 onClick={(e) => clickCompletion(e, val)}
                                 key={index}>{suggestionRender(val)}</AutocompleteItem>))
            }
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

