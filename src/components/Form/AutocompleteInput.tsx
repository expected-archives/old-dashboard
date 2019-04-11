import { styled, theme } from "../../style"
import React, { ChangeEvent, useEffect, useState } from "react";

const Input = styled.input`
  margin-bottom: 5px;
  flex-grow:0;
  flex-shrink:0;
  border: none;
  width: 285px;
  outline: none;
  box-shadow: none;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:disabled, &[readonly] {
     background: ${props => props.theme.color.grey};
  }
`

const Tag = styled.span`
  margin-bottom: 0.375rem;
  border-radius: 3px;
  flex-grow:0;
  flex-shrink:0;
  background: ${theme.color.greyDark};
  color: white;
  display: inline-block;
  text-align: center;
  padding: 0.25rem;
  margin-right: 0.5rem;
`

const Autocomplete = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0.375rem 0.75rem 0;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${props => props.theme.text.normal};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: ${props => props.theme.color.blue};
  }
  
  &:disabled, &[readonly] {
    background: ${props => props.theme.color.grey};
  }
`

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
  hasTags?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  name: string,
  placeholder: string,
}

export default ({ name, onChange, suggestions, placeholder = "", hasTags = false }: IProps) => {

  const [completions, setCompletions] = useState<string[]>([])
  const [value, setValue] = useState("")
  const [completionIndex, setCompletionIndex] = useState(-1)
  const [id] = useState('_' + Math.random().toString(36).substr(2, 9))

  const [tags, setTags] = useState<Set<string>>(new Set())
  const [tagsIndex, setTagsIndex] = useState(-1)

  useEffect(() => {
    const focusOut = (_: any) => hide()
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

  const select = (val: string) => {
    if (hasTags && val.trim().length !== 0) {
      addTags(val)
      select("")
    } else {
      setValue(val)
    }
    hide()
    onChange({ target: { name, value: val } } as ChangeEvent<HTMLInputElement>)
  }

  const hide = () => {
    setCompletionIndex(-1)
    setCompletions([])
  }

  const addTags = (val: string) => setTags(new Set(Array.from(tags).concat([val])))
  const removeTags = (val: string) => setTags(new Set(Array.from(tags).filter(e => e !== val)))

  const key = (e: any) => {

    const completionDown = () => setCompletionIndex(completionIndex + 1 > completions.length - 1 ? 0 : completionIndex + 1)
    const completionUp = () => setCompletionIndex(completionIndex - 1 < 0 ? completions.length - 1  : completionIndex - 1)

    const tagsRight = () => setTagsIndex(tagsIndex + 1 > completions.length - 1 ? 0 : tagsIndex + 1)
    const tagsLeft = () => setTagsIndex(tagsIndex - 1 < 0 ? completions.length - 1  : tagsIndex - 1)

    console.log(e.keyCode)

    if (e.keyCode === 27 || e.keyCode === 9) hide()
    else if (e.keyCode === 40) completionDown()
    else if (e.keyCode === 38) completionUp()
    else if (e.keyCode === 37) tagsLeft()
    else if (e.keyCode === 39) tagsRight()
    else if (e.keyCode === 13 && completionIndex !== -1) {
      e.preventDefault()
      select(completions[completionIndex])
    } else if (e.keyCode === 13 && hasTags && value.trim().length > 0 && completionIndex === -1) {
      e.preventDefault()
      select(value)
      select("")
    } else if (e.keyCode === 8 && hasTags && value.trim().length === 0) {
      if (tags.size > 0) {
        removeTags(Array.from(tags)[tags.size - 1])
      }
    }
  }

  const sizeOfInput = () => {
    const d = document.getElementById(id)
    if (d) return d.offsetWidth + "px"
    else return '100%'
  }

  return (
    <div onKeyDown={key}>
      <Autocomplete id={id}>
        {Array.from(tags).map((tag, index) =>
          (<Tag style={index !== completionIndex ? {} : { background: theme.color.dark }} key={index}>{tag}</Tag>))
        }
        <Input type="text" placeholder={placeholder} name={name} value={value} onChange={change} autoComplete="off"/>
      </Autocomplete>
      {
        completions.length > 0
          ?
          <AutocompleteItems style={{ width: sizeOfInput() }}>
            {completions.map((val, index) =>
              (<AutocompleteItem style={index !== completionIndex ? {} : { background: theme.color.grey }}
                                 onClick={(_) => select(val)} key={index}>{val}</AutocompleteItem>))
            }
          </AutocompleteItems>
          : <></>
      }
    </div>
  )
}

