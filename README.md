## Git blog 제작 가이드라인

### 로컬 폴더를 Git 원격 저장소와 연결

1. 업로드할 폴더의 상위 폴더로 이동
2. 깃을 사용할 수 있도록 폴더를 초기화

`$ git init`

3. add 명령어를 실행하여 tracked 파일로 변경
`git add .` 
4. commit 명령어를 실행하여 폴더를 커밋
`git commit -m "Commit Message"`
5. 로컬 저장소를 원격 저장소와 연결
`git remote add origin "원격 저장소 주소"`
6. remote -v 명령어를 실행하여 로컬 저장소와 원격 저장소가 연결되었는지 확인
`git remote -v`
7. push 명령어를 실행하여 폴더를 업로드
`git push origin master`
 
---

### Gatsby 블로그 개발 기록

#### Gatsby Link API를 통한 페이지 이동

Gatsby에서는 기본적으로 페이지 이동을 위한 API를 제공하고 있습니다.
해당 API가 바로 Gatsby Link API인데요, 이 API를 통해 페이지 이동을 구현하면 보다 더 높은 성능의 정적 사이트를 구현할 수 있습니다.
먼저 이 API를 통해 페이지 이동을 구현한 다음, 결과물을 보며 어떤 차이점이 있는지 확인해봅시다.
Gatsby Link API는 다음과 같이 사용합니다.

#### Gatsby Link API의 성능상 이점

Gatsby는 Prefetch를 통해 페이지에서 사용할 리소스의 로딩 속도를 높인다고 합니다.
그럼 어떻게 페이지를 찾고 Prefetch를 진행할까요?
이를 위한 것이 바로 Gatsby Link API에서 제공하는 Link 컴포넌트입니다.
페이지가 로드되면 Gatsby는 리소스 로드 속도를 높이기 위해 현재 페이지에서 사용되는 모든 링크를 찾은 후, 각 링크의 페이지를 미리 로드하기 시작합니다.
우리가 생성한 프로젝트에서 확인해보면 메인 페이지의 로딩이 완료되면, Gatsby는 /info 링크를 찾고, 이 페이지를 미리 로드하는 것이죠.
이를 통해 Gatsby는 더 높은 사용자 경험을 제공할 수 있는 것입니다.