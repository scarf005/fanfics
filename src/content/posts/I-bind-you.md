---
title: I =<< You
description: SF 자유주제 대회에 낸 글입니다.

image: https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg

pubDate: 2023-07-17
---

## 프롤로그

"세상에, 네가 약속 시간보다 일찍 오는 날이 다 있네. 오늘은 해가 서쪽에서 뜨니?"

노트북 화면을 살짝 낮추니 익숙한 장면이다. 한명은 뾰루퉁한 채로 앉아있고 나머지 한 명은 지각한 것을 멋쩍게 웃으며 흘러넘기는 모습. 하지만 이번에는 다르다. 지각한 게 내가 아니니까!

"대체 나를 평소에 어떻게 보는 거야."

나는 툴툴대면서도 속으로 진땀을 뺐다. 그도 그럴 것이 사실 약속 장소에 어제부터 그대로 있었으니까. 밤을 새서 노트북을 쓰다 그대로 눈을 감았다 뜨니 그대로 약속 시간. 엄밀히 말하면 24시간 지각인가? 하지만 지금은 내가 유리한 상황이니 입을 다물었다.

"라떼 하나만 시키고 올게."

"설탕 너무 많이 넣지는 마."

"아직은 당뇨 아니니까 괜찮아."

조금 뒤 네가 손에 컵을 들고 돌아오자 나는 조금 얻어마셔본다. 세상에.

## 모든 일의 원흉

"모나드가 뭐야?"

혀가 마비되어서 켁켁대던 중에 듣고야 말았다.

"타입을 담는 상자야. 그런데 모나드는 왜?"

"인터넷에서 봤는데 쓰면 좋다길래."

"뭐 그거야 상황에 따라 다르긴 한데, 시간 돼? 몇 가지 예시를 보여줄게."

```hs
-- Maybe Int는 Int 타입을 가진 값을 1개나 0개 담을 수 있는 상자
Just 3 : Maybe Int -- 숫자가 하나 담긴 Maybe
Nothing : Maybe Int -- 숫자가 담기지 않은 Maybe

divide10By : Int -> Maybe Int
divide10By 0 = Nothing -- 계산 실패
divide10By x = Just (10 `div` x) -- 계산 성공!

-- List Int는 Int 타입을 가진 값을 여러개 담을 수 있는 상자
[1,2,3] : List Int -- 숫자가 3개 담긴 List
[] : List Int -- 숫자가 0개 담긴 List

greet : List String -> String
greet [] = "아무도 없네요" -- 값이 0개
greet [x] = "\{x}님 안녕하세요"
greet [x, y] = "\{x}님과 \{y}님 안녕하세요"
greet _ = "여러분 모두 안녕하세요" -- 값이 여러개

-- IO (Input Output)은 입출력을 담는 상자
getLine : IO String -- 문자열을 담은 IO
putStrLn : String -> IO () -- 문자열을 받아 아무것도 담지 않은 IO를 돌려주는 함수
```

"IO?"

"그러니까 세상과의 상호작용. 파일을 읽고 쓰거나, 모니터에 그림을 그리거나, 음악을 재생한다거나, 은행에서 출금한다거나."

"그게 끝이야? 별거 없네. 그러면 왜 다들 모나드가 어렵다고 하고 또 좋다고 하는 거야?"

"음, 이 상자들끼리 특별한 규칙을 지키는 덕에 함수 합성을 쉽게 할 수 있게 해 주거든."

## 함수 합성

"함수 합성?"

"두 함수를 합쳐서 새 함수를 만들어."

"그거 하면 어떤 점이 좋아?"

"작은 함수들을 레고처럼 조립해서 원하는 일을 하는 함수를 쉽게 만들 수 있어. 파이썬에서 10을 빼고, 2를 곱하고, 3을 더하는 함수들을 각각 만든 다음에, 하나로 합쳐 볼래?"

```py
def add3(x):
    return x + 3

def mult2(x):
    return x * 2

def sub10(x):
    return x - 10

def a(x):
    return add3(mult2(sub10(x)))

In  >>> a(20)
Out >>> 23
```

"이런 거?"

"맞아. 그런데 함수들을 하나로 합치는 더 간결한 방법이 있어. 수학에서는 점 기호(`.`)를 써서 함수 합성을 나타내거든. 그러면 이런 식으로도 쓸 수 있어.

```hs
add3 x = x + 3

mult2 x = x * 2

sub10 x = x - 10

-- a, b, c는 모두 동일한 일을 하는 함수
a x = add3 (mult2 (sub10 x))
b x = (add3 . mult2 . sub10) x
c = add3 . mult2 . sub10

In  >>> a 20
Out >>> 23
In  >>> b 20
Out >>> 23
In  >>> c 20
Out >>> 23
```

"솔직히 큰 차이는 모르겠어."

"그렇긴 하지. 좀더 복잡한 예시를 드는 게 낫겠다. 파이썬에서 숫자 배열에서 홀수만 골라서 3을 더한 다음에, 20보다 작은 값만 고르는 함수를 쓰려면 어떻게 할거야?"

```py
def odd(x: int) -> int:
    return x % 2 != 0

def add3(x: int) -> int:
    return x + 3

def is_less20(x: int) -> bool:
    return x < 20

# 배열 순회 방법
def solution1(lst: list[int]) -> list[int]:
    result = []
    for x in lst:
        if not odd(x):
            continue

        tmp = add3(x)
        if is_less20(tmp):
            result.append(tmp)
    return result

# 리스트 컴프리헨션 방법
def solution2(lst: list[int]) -> list[int]:
    return [x + 3 for x in lst if odd(x) and is_less20(add3(x))]

In  >>> solution1([1,5,10,15,20,25])
Out >>> [4, 8, 18]
In  >>> solution2([1,5,10,15,20,25])
Out >>> [4, 8, 18]
```

"이렇게? 생각보다 좀 복잡하네."

"정리 잘 했네. 그런데 함수 합성을 쓰면 이렇게도 쓸 수 있어."

```hs
odd : Int -> Bool
odd x = x `mod` 2 /= 0

add3 : Int -> Int
add3 x = x + 3

is_less20 : Int -> Bool
is_less20 x = x < 20

solution : List Int -> List Int
solution = filter is_less20 . map add3 . filter odd

In  >>> solution [1,5,10,15,20,25]
Out >>> [4, 8, 18]
```

"훨씬 간단해 보이긴 한데, 모나드와 어떤 관계가 있는지는 잘 모르겠어."

"왜 좋은지를 이해하려면 그전에 카테고리 이론에 대해 알아야 해."

## 카테고리

"벌써부터 머리가 아픈데."

"아냐, 정말 겉핥기로만 알아도 돼. 어려운 용어같은건 다 생략할거니까. 요지는, 무언가가 카테고리에 속하려면 세가지 규칙을 지켜야 돼. **결합법칙**, **왼쪽 항등성**, **오른쪽 항등성**."

"나 이제 가도 돼?"

"잠깐만잠깐만, 이거 말이 한자라서 쓸데없이 복잡하지 진짜 별거 아냐. 봐봐, 항등원은 덧셈에 0같이 연산 해도 결과가 바뀌지 않는 값이야."

```hs
-- 덧셈의 항등원은 0

0 + a == a -- 왼쪽 항등성
a + 0 == a -- 오른쪽 항등성

-- 곱셈의 항등원은 1

1 * a == a -- 왼쪽 항등성
a * 1 == a -- 오른쪽 항등성
```

"어려운 말이라서 긴장했는데 별거 아니었네."

"그치? 결합법칙도 비슷해. 계산할때 어떤 연산을 먼저 해도 괜찮은 성질이야. 예를 들어서 `1 + 2 + 3`을 할때, `1 + 2`를 먼저 해도, `2 + 3`을 먼저 해도 결과는 똑같잖아."

```hs
-- 덧셈은 결합법칙을 만족
(1 + 2) + 3 == 1 + (2 + 3)

-- 곱셈은 결합법칙을 만족
(1 * 2) * 3 == 1 * (2 * 3)

-- 뺄셈은 결합법칙을 만족하지 않음
(1 - 2) - 3 != 1 - (2 - 3)
```

"여기까지는 이해가 갈 것 같아."

"아까 카테고리는 방금 말한 결합법칙, 왼쪽 항등성, 오른쪽 항등성을 지켜야 한다고 했지? 방금 전에 쓴 식이랑 이 식이랑 비교해 봐."

```hs
(f . g) . h = f . (g . h) -- 결합법칙

-- id (identity) : 항등원

id . f = f -- 왼쪽 항등성

f . id = f -- 오른쪽 항등성
```

"아까 보여준 덧셈이랑 뺄셈 예시랑 비슷하네."

"바로 그거야. 여기서 중요한 건 여기 `f` 와 `g`와 `h`와 `.`과 `id` 있지? 이것들이 무엇인지 아무것도 몰라도 된다는 거야. 하지만 이 성질을 응용하면 여러 계산을 편하게 할 수 있어. 덧셈, 뺄셈, 함수들이 카테고리를 어떻게 만족하는지 다시 보면 이런 식이야."

| 카테고리 \ 기호 |  `f`   |   `g`   |   `h`   | `.` | `id` |
| :-------------- | :----: | :-----: | :-----: | :-: | :--: |
| 덧셈            |   1    |    2    |    3    | `+` |  0   |
| 곱셈            |   1    |    2    |    3    | `*` |  1   |
| 함수            | `add3` | `mult2` | `sub10` | `.` | `id` |

"그러니까 함수들은 카테고리이기 때문에 덧셈이나 곱셈처럼 하나로 합칠수 있다는 거고, 그게 함수 합성인 거네?"

"잘 이해했네."

"그런데 이렇게 길게 설명한 건 모나드랑 카테고리랑 어떤 관계인지 알려주려고 한 것일 텐데 모나드에 대한 설명은 없네."

"사실 여기서부터 좀 어려워지거든."

"나 갈께."

"아니아니아니 잠깐만 기다려줘 응?"

"지금보다 어려워지면 나 정말 갈거야."

## 모나드와 카테고리는 어떤 사이인가요

```hs
||| 항등함수
|||
||| a를 받아서 a를 반환하는 함수
id : a -> a

-- Int를 받아서 Int를 반환
In  >>> id 3
Out >>> 3

||| 항등함수 x 모나드
|||
||| 모나드인 m에 대해 a를 받아서 모나드 m에 감싼 m a를 반환하는 함수
pure : Monad m => a -> m a

-- 모나드인 List 에 대해 Int를 받아서 모나드 List에 감싼 List Int를 반환
In  >>> the (List Int) (pure 3)
Out >>> [3]

-- 모나드인 Maybe 에 대해 Int를 받아서 모나드 Maybe에 감싼 Maybe Int를 반환
In  >>> the (Maybe Int) (pure 3)
Out >>> Just 3

-- 모나드인 IO에 대해 Int를 받아서 모나드 IO에 감싼 IO Int를 반환
In  >>> the (IO Int) (pure 3)
Out >>> IO 3

||| 함수 합성
|||
||| 두 함수를 하나의 함수로 합치는 함수
||| 'b를 받아 c를 반환하는 함수'와 'a를 받아 b를 반환하는 함수'를 'a를 받아 c를 반환하는 함수'로 합침
(.) : (b -> c) -> (a -> b) -> (a -> c)

In  >>> ((+ 1) . (* 2)) 10
Out >>> 21

||| 함수 합성 x 모나드
|||
||| 'b를 받아 m c를 반환하는 함수'와 'a를 받아 m b를 반환하는 함수'를 'a를 받아 m c를 반환하는 함수'로 합침
(<=<) : Monad m => (b -> m c) -> (a -> m b) -> (a -> m c)

In  >>> ((\x => Just (x + 1)) <=< (\x => Just (x * 2))) 10
Out >>> Just 21
```

"나 진짜 간다?"

"아니으아정말타입들만따로모은것들만봐줘서로뭔가비슷한거같지않아"

```hs
id    :             a ->   a
pure  : Monad m =>  a -> m a

(.)   :            (b ->   c) -> (a ->   b) -> (a ->   c)
(<=<) : Monad m => (b -> m c) -> (a -> m b) -> (a -> m c)
```

"...그렇긴 하네. 그런데 왜 평범한 함수 합성이랑 항등원과 다르게 모나드 함수들은 다시 되돌리는 함수가 없어?"

"그게, 어떤 상자에 한번 값을 담으면 다시 되돌릴 수 없거든. 아까 입출력도 상자(모나드)라고 했지? 그러니까 한번 모니터에 글자를 출력하면 시간을 되돌리지 않는 이상 다시 지울 수 없는 거야."

## `>>=`

"맞다, 마지막으로 `>>=`가 있어."

"아직도 안 끝났어?"

질린 표정이다.

"왜 그래, 네가 먼저 알고 싶다고 한 걸, 난 오히려 피해자라고."

상당히 무서운 표정이다.

"알았어 미안, 정말 빨리 끝낼게."

"그 말 오늘 10번은 들은 것 같지만."

"뭐 쨌든, 바인드라고도 불러. 아까 `getLine`이랑 `putStrLn` 함수 봤지? 둘을 같이 쓰려면 어떻게 해야 할까?"

"잠깐만 나 기억 안나, 화면 다시 한번 보여줘."

```hs
getLine : IO String -- 문자열을 담은 IO
putStrLn : String -> IO () -- 문자열을 받아 아무것도 담지 않은 IO를 돌려주는 함수
```

"그래서 `>>=`가 뭐라고?"

```hs
||| '바인드': 상자에서 값을 뽑아다 값을 받아 모나드에 넣어주는 함수에 집어넣어주는 함수
(>>=) : Monad m => m a -> (a -> m b) -> m b

||| IO String 에서 String을 뽑아서 putStrLn에 건내주는 함수
main : IO ()
main = getLine >>= putStrLn

-- 문법 설탕, do 표기법을 쓰면
main : IO ()
main = do
  input <- getLine
  putStrLn input
```

"문법 설탕이 좀 많이 다네. 모르고 보면 거의 파이썬인걸. 언어에 설탕이 이렇게 많아도 돼?"

"그러게."

나는 라떼가 비워지는 것을 천천히 보았다.

## 에필로그

"근데 생각보다 재미는 있네. 파이썬에서 쓸만할지는 잘 모르겠지만"

"...으음 사실 이런거 배워서 다른 언어에서 쓰기는 아직은 좀 힘들지."

"또 읽을 만한 것 있어?"

"여기."

- [Functors, Applicatives, and Monads in pictures](https://www.adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)
- [카테고리 디자인 패턴](https://www.haskellforall.com/2012/08/the-category-design-pattern.html)
- [기찻길 지향 프로그래밍](https://fsharpforfunandprofit.com/rop/)

"그리고 너가 보여준 코드들 이거 다 수도코드야? 하스켈이랑 문법이 좀 다른거 같은데. 어떤 거야?"

- [Idris2](https://idris2.readthedocs.io/)