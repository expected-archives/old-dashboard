import { styled, theme } from "../../style"
import React, { KeyboardEvent, ReactNode, useReducer, useState } from "react"

const Input = styled.input`
  width: auto;
  margin-bottom: 5px;
  flex-grow: 1;
  flex-shrink: 0;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  
  &:disabled, &[readonly] {
     background: ${props => props.theme.color.grey};
  }
`

const Tag = styled.p`
  margin-bottom: 0.375rem;
  border-radius: 3px;
  flex-grow:0;
  flex-shrink:0;
  background: ${theme.color.greyDark};
  color: white;
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
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
  
  &:disabled, &[readonly] {
    background: ${props => props.theme.color.grey};
  }
`

const SuggestionList = styled.div`
  margin-top: 10px;
  border-radius: 0.25rem;
  position: absolute;
  display: block;
  z-index: 99;
  border: 1px solid ${theme.color.grey};
  width: 100%;
`

const Suggestion = styled.div`
  cursor: pointer;
  background: white;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  
  :hover{
    background: ${theme.color.greyLight};
  }
`

interface IProps {
  suggestions: string[]
  onChange: (event: string[]) => void
  name: string
  placeholder?: string
  defaultTags?: string[]
  suggestionRender?: (suggest: string) => ReactNode
}

interface IState {
  value: string
  tags: string[]
  suggestions: string[]
  currentSuggestions: string[]
  suggestionOffset: number
  suggestionIndex: number
  tagIndex: number
}

type Action =
  { action: "SET_VALUE", value: string } |
  { action: "ADD_TAG", value: string } |
  { action: "DELETE_TAG", value: string } |
  { action: "SET_TAG_INDEX", value: number } |
  { action: "SET_SUGGESTION_INDEX", value: number }

const reducer = (state: IState, action: Action) => {
  switch (action.action) {
    case "SET_VALUE":
      return {
        ...state,
        value: action.value,
        currentSuggestions: action.value.trim() ?
          state.suggestions.filter(s => s.startsWith(action.value)) : [],
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "ADD_TAG":
      return {
        ...state,
        value: "",
        tags: state.tags.includes(action.value) || !action.value.trim() ?
          state.tags : [...state.tags, action.value],
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "DELETE_TAG":
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.value),
        tagIndex: -1,
        suggestionIndex: -1,
      }
    case "SET_TAG_INDEX":
      return {
        ...state,
        tagIndex: action.value < 0 || action.value >= state.tags.length ?
          (action.value < 0 ? state.tags.length - 1 : 0) : action.value,
      }
    case "SET_SUGGESTION_INDEX":
      return {
        ...state,
        suggestionIndex: action.value < 0 || action.value >= state.currentSuggestions.length ?
          (action.value < 0 ? state.tags.length - 1 : 0) : action.value,
      }
  }
  return state
}

export default ({ suggestions, placeholder = "", defaultTags = [] }: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    tags: defaultTags,
    suggestions,
    currentSuggestions: [],
    suggestionOffset: 0,
    suggestionIndex: -1,
    tagIndex: -1,
  })

  const [isFocused, setFocused] = useState(false)
  const [id] = useState("_" + Math.random().toString(36).substr(2, 9))


  const handleInputKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if ([32, 13, 186, 188].includes(event.keyCode)) { // space, enter, semi, comma key
      event.preventDefault()
      dispatch({
        action: "ADD_TAG",
        value: state.value,
      })
    } else if ([37, 39].includes(event.keyCode)) { // left, right arrow key
      event.preventDefault()
      dispatch({
        action: "SET_TAG_INDEX",
        value: event.keyCode === 37 ? state.tagIndex - 1 : state.tagIndex + 1,
      })
    } else if ([38, 40].includes(event.keyCode)) { // up, down arrow key
      event.preventDefault()
      dispatch({
        action: "SET_SUGGESTION_INDEX",
        value: event.keyCode === 38 ? state.suggestionIndex - 1 : state.suggestionIndex + 1,
      })
    } else if (event.keyCode === 8 && (state.tagIndex !== -1 || !state.value.trim())) { // del key
      event.preventDefault()
      dispatch({
        action: "DELETE_TAG",
        value: state.tags[state.tagIndex !== -1 ? state.tagIndex : state.tags.length - 1],
      })
    }
  }

  return (
    <>
      <Autocomplete>
        {state.tags.map((tag, index) => (
          <Tag onClick={() => dispatch({ action: "DELETE_TAG", value: tag })}
               style={index !== state.tagIndex ? {} : { background: theme.color.dark }} key={index}>
            {tag}
          </Tag>
        ))}
        <Input type="text" placeholder={placeholder} value={state.value} autoComplete="off" onKeyDown={handleInputKey}
               onChange={(e) => dispatch({ action: "SET_VALUE", value: e.target.value })}/>
      </Autocomplete>
      {state.currentSuggestions.length > 0 && (
        <SuggestionList>
          {state.currentSuggestions.map((value, index) => (
            <Suggestion className={"autocomplete-item"}
                        style={index === state.suggestionIndex ? { background: theme.color.greyLight } : {}}
                        onClick={() => dispatch({ action: "ADD_TAG", value })}
                        key={index}>
              {value}
            </Suggestion>
          ))}
        </SuggestionList>
      )}
    </>
  )
}
