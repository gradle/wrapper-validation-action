// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/revwalk.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/commit.h"
  #include "../include/functions/copy.h"
  #include "../include/oid.h"
  #include "../include/repository.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitRevwalk::~GitRevwalk() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
                                                                           }

  void GitRevwalk::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Revwalk").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "hide", Hide);
            Nan::SetPrototypeMethod(tpl, "hideGlob", HideGlob);
            Nan::SetPrototypeMethod(tpl, "hideHead", HideHead);
            Nan::SetPrototypeMethod(tpl, "hideRef", HideRef);
             Nan::SetMethod(tpl, "create", Create);
            Nan::SetPrototypeMethod(tpl, "next", Next);
            Nan::SetPrototypeMethod(tpl, "push", Push);
            Nan::SetPrototypeMethod(tpl, "pushGlob", PushGlob);
            Nan::SetPrototypeMethod(tpl, "pushHead", PushHead);
            Nan::SetPrototypeMethod(tpl, "pushRange", PushRange);
            Nan::SetPrototypeMethod(tpl, "pushRef", PushRef);
            Nan::SetPrototypeMethod(tpl, "repository", Repository);
            Nan::SetPrototypeMethod(tpl, "reset", Reset);
            Nan::SetPrototypeMethod(tpl, "simplifyFirstParent", SimplifyFirstParent);
            Nan::SetPrototypeMethod(tpl, "sorting", Sorting);
            Nan::SetPrototypeMethod(tpl, "commitWalk", CommitWalk);
            Nan::SetPrototypeMethod(tpl, "fastWalk", FastWalk);
            Nan::SetPrototypeMethod(tpl, "fileHistoryWalk", FileHistoryWalk);
    
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Revwalk").ToLocalChecked(), _constructor_template);
  }

  
/*
   * @param Oid commit_id
     * @return Number  result    */
NAN_METHOD(GitRevwalk::Hide) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0
    || (!info[0]->IsObject() && !info[0]->IsString())) {
    return Nan::ThrowError("Oid commit_id is required.");
  }
// start convert_from_v8 block
  const git_oid * from_commit_id = NULL;
  if (info[0]->IsString()) {
    // Try and parse in a string to a git_oid
    Nan::Utf8String oidString(Nan::To<v8::String>(info[0]).ToLocalChecked());
    git_oid *oidOut = (git_oid *)malloc(sizeof(git_oid));

    if (git_oid_fromstr(oidOut, (const char *) strdup(*oidString)) != GIT_OK) {
      free(oidOut);

      if (git_error_last()) {
        return Nan::ThrowError(git_error_last()->message);
      } else {
        return Nan::ThrowError("Unknown Error");
      }
    }

    from_commit_id = oidOut;
  }
  else {
from_commit_id = Nan::ObjectWrap::Unwrap<GitOid>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
  }
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_commit_id
    );

 int result =     git_revwalk_hide(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_commit_id
    );

      if (info[0]->IsString()) {
        free((void *)from_commit_id);
      }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String glob
     * @return Number  result    */
NAN_METHOD(GitRevwalk::HideGlob) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String glob is required.");
  }

// start convert_from_v8 block
  const char * from_glob = NULL;

  Nan::Utf8String glob(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_glob = (const char *) malloc(glob.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_glob, *glob, glob.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_glob) + glob.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_glob
    );

 int result =     git_revwalk_hide_glob(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_glob
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRevwalk::HideHead) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

 int result =     git_revwalk_hide_head(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String refname
     * @return Number  result    */
NAN_METHOD(GitRevwalk::HideRef) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String refname is required.");
  }

// start convert_from_v8 block
  const char * from_refname = NULL;

  Nan::Utf8String refname(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_refname = (const char *) malloc(refname.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_refname, *refname, refname.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_refname) + refname.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_refname
    );

 int result =     git_revwalk_hide_ref(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_refname
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
  * @param Repository repo
     * @return Revwalk out    */
NAN_METHOD(GitRevwalk::Create) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsObject()) {
    return Nan::ThrowError("Repository repo is required.");
  }

      git_revwalk * out = 0;
// start convert_from_v8 block
  git_repository * from_repo = NULL;
from_repo = Nan::ObjectWrap::Unwrap<GitRepository>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              from_repo
    );

 int result =     git_revwalk_new(
&          out
,          from_repo
    );

      if (result != GIT_OK) {

        if (git_error_last()) {
          return Nan::ThrowError(git_error_last()->message);
        } else {
          return Nan::ThrowError("Unknown Error");
        }
      } // lock master scope end

      v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (out != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
          Nan::Set(
          owners,
          Nan::New<v8::Number>(owners->Length()),
          Nan::To<v8::Object>(GitRepository::New(
            git_revwalk_repository(out),
            true
          )).ToLocalChecked()
        );
         to = GitRevwalk::New(
        out,
        true
          , owners
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
  
/*
     * @param Oid callback
   */
NAN_METHOD(GitRevwalk::Next) {

  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  NextBaton* baton = new NextBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;

      baton->out = (git_oid *)malloc(sizeof(git_oid ));
        baton->walk = Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  NextWorker *worker = new NextWorker(baton, callback);

        worker->SaveToPersistent("walk", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitRevwalk::NextWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(
      /*asyncAction: */true
            ,baton->out
            ,baton->walk
    );

    int result = git_revwalk_next(
baton->out,baton->walk  );

      baton->error_code = result;

      if (result != GIT_OK && git_error_last() != NULL) {
        baton->error = git_error_dup(git_error_last());
      }

  }
}

void GitRevwalk::NextWorker::HandleOKCallback() {
    if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (baton->out != NULL) {
        to = GitOid::New(
        baton->out,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
      v8::Local<v8::Value> result = to;

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method next has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.next").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      std::queue< v8::Local<v8::Value> > workerArguments;
      bool callbackFired = false;
      while(!workerArguments.empty()) {
        v8::Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        ) {
          continue;
        }

        v8::Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        v8::Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined()) {
          v8::Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        v8::Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex) {
          v8::Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          v8::Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined()) {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired) {
        v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method next has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.next").ToLocalChecked());
        v8::Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    } else {
      callback->Call(0, NULL, async_resource);
    }

  }


  delete baton;
}

   
/*
   * @param Oid id
     * @return Number  result    */
NAN_METHOD(GitRevwalk::Push) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0
    || (!info[0]->IsObject() && !info[0]->IsString())) {
    return Nan::ThrowError("Oid id is required.");
  }
// start convert_from_v8 block
  const git_oid * from_id = NULL;
  if (info[0]->IsString()) {
    // Try and parse in a string to a git_oid
    Nan::Utf8String oidString(Nan::To<v8::String>(info[0]).ToLocalChecked());
    git_oid *oidOut = (git_oid *)malloc(sizeof(git_oid));

    if (git_oid_fromstr(oidOut, (const char *) strdup(*oidString)) != GIT_OK) {
      free(oidOut);

      if (git_error_last()) {
        return Nan::ThrowError(git_error_last()->message);
      } else {
        return Nan::ThrowError("Unknown Error");
      }
    }

    from_id = oidOut;
  }
  else {
from_id = Nan::ObjectWrap::Unwrap<GitOid>(Nan::To<v8::Object>(info[0]).ToLocalChecked())->GetValue();
  }
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_id
    );

 int result =     git_revwalk_push(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_id
    );

      if (info[0]->IsString()) {
        free((void *)from_id);
      }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String glob
     * @return Number  result    */
NAN_METHOD(GitRevwalk::PushGlob) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String glob is required.");
  }

// start convert_from_v8 block
  const char * from_glob = NULL;

  Nan::Utf8String glob(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_glob = (const char *) malloc(glob.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_glob, *glob, glob.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_glob) + glob.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_glob
    );

 int result =     git_revwalk_push_glob(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_glob
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitRevwalk::PushHead) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

 int result =     git_revwalk_push_head(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String range
     * @return Number  result    */
NAN_METHOD(GitRevwalk::PushRange) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String range is required.");
  }

// start convert_from_v8 block
  const char * from_range = NULL;

  Nan::Utf8String range(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_range = (const char *) malloc(range.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_range, *range, range.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_range) + range.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_range
    );

 int result =     git_revwalk_push_range(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_range
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
   * @param String refname
     * @return Number  result    */
NAN_METHOD(GitRevwalk::PushRef) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String refname is required.");
  }

// start convert_from_v8 block
  const char * from_refname = NULL;

  Nan::Utf8String refname(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_refname = (const char *) malloc(refname.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_refname, *refname, refname.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_refname) + refname.length()), 0, 1);
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
            ,
              from_refname
    );

 int result =     git_revwalk_push_ref(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_refname
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Repository  result    */
NAN_METHOD(GitRevwalk::Repository) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

 git_repository * result =     git_revwalk_repository(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (result != NULL) {
        to = GitRepository::New(
        result,
        true
       );
   }
  else {
    to = Nan::Null();
  }
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     */
NAN_METHOD(GitRevwalk::Reset) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

    git_revwalk_reset(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
     */
NAN_METHOD(GitRevwalk::SimplifyFirstParent) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

    git_revwalk_simplify_first_parent(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
   
/*
   * @param Number sort_mode
     */
NAN_METHOD(GitRevwalk::Sorting) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Number sort_mode is required.");
  }

// start convert_from_v8 block
  unsigned int from_sort_mode;
      from_sort_mode = (unsigned int)   info[0].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
    );

    git_revwalk_sorting(
          Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue()
,          from_sort_mode
    );

      return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
        #define SET_ON_OBJECT(obj, field, data) Nan::Set(obj, Nan::New(field).ToLocalChecked(), data)

v8::Local<v8::Object> signatureToJavascript(const git_signature *signature) {
  v8::Local<v8::Object> signatureObject = Nan::New<v8::Object>();
  SET_ON_OBJECT(signatureObject, "name", Nan::New(signature->name).ToLocalChecked());
  SET_ON_OBJECT(signatureObject, "email", Nan::New(signature->email).ToLocalChecked());
  SET_ON_OBJECT(signatureObject, "date", Nan::New<v8::Number>(signature->when.time * 1000));
  std::stringstream fullSignature;
  fullSignature << signature->name << " <" << signature << ">";
  SET_ON_OBJECT(signatureObject, "full", Nan::New(fullSignature.str()).ToLocalChecked());
  return signatureObject;
}

#include <iostream>
class CommitModel {
public:
  CommitModel(git_commit *commit, bool fetchSignature):
    commit(commit),
    fetchSignature(fetchSignature),
    signature({ 0, 0, 0 }),
    signedData({ 0, 0, 0 })
  {
    if (fetchSignature) {
      const int error = git_commit_extract_signature(
        &signature,
        &signedData,
        git_commit_owner(commit),
        const_cast<git_oid *>(git_commit_id(commit)),
        NULL
      );
      if (error != GIT_ENOTFOUND) {
        assert(error == GIT_OK);
      }
    }

    const size_t parentCount = git_commit_parentcount(commit);
    parentIds.reserve(parentCount);
    for (size_t parentIndex = 0; parentIndex < parentCount; ++parentIndex) {
      parentIds.push_back(git_oid_tostr_s(git_commit_parent_id(commit, parentIndex)));
    }
  }

  v8::Local<v8::Value> toJavascript() {
    if (!fetchSignature) {
      v8::Local<v8::Value> commitObject = GitCommit::New(
        commit,
        true,
        Nan::To<v8::Object>(GitRepository::New(
          git_commit_owner(commit),
          true
        )).ToLocalChecked()
      );
      commit = NULL;
      return commitObject;
    }

    v8::Local<v8::Object> commitModel = Nan::New<v8::Object>();
    SET_ON_OBJECT(commitModel, "sha", Nan::New(git_oid_tostr_s(git_commit_id(commit))).ToLocalChecked());
    SET_ON_OBJECT(commitModel, "message", Nan::New(git_commit_message(commit)).ToLocalChecked());
    SET_ON_OBJECT(commitModel, "author", signatureToJavascript(git_commit_author(commit)));
    SET_ON_OBJECT(commitModel, "committer", signatureToJavascript(git_commit_committer(commit)));

    size_t parentCount = parentIds.size();
    v8::Local<v8::Array> parents = Nan::New<v8::Array>(parentCount);
    for (size_t parentIndex = 0; parentIndex < parentCount; ++parentIndex) {
      Nan::Set(parents, Nan::New<v8::Number>(parentIndex), Nan::New(parentIds[parentIndex]).ToLocalChecked());
    }
    SET_ON_OBJECT(commitModel, "parents", parents);

    if (signature.size != 0 || signedData.size != 0) {
      v8::Local<v8::Object> gpgSignature = Nan::New<v8::Object>();
      if (signature.size != 0) {
        SET_ON_OBJECT(gpgSignature, "signature", Nan::New(signature.ptr).ToLocalChecked());
      } else {
        SET_ON_OBJECT(gpgSignature, "signature", Nan::Null());
      }

      if (signedData.size != 0) {
        SET_ON_OBJECT(gpgSignature, "signedData", Nan::New(signedData.ptr).ToLocalChecked());
      } else {
        SET_ON_OBJECT(gpgSignature, "signedData", Nan::Null());
      }

      SET_ON_OBJECT(commitModel, "gpgSignature", gpgSignature);
    }

    return commitModel;
  }

  ~CommitModel() {
    git_buf_dispose(&signature);
    git_buf_dispose(&signedData);
    if (commit) {
      git_commit_free(commit);
    }
  }

private:
  git_commit *commit;
  bool fetchSignature;
  git_buf signature, signedData;
  std::vector<std::string> parentIds;
};

NAN_METHOD(GitRevwalk::CommitWalk) {
  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Max count is required and must be a number.");
  }

  if (info.Length() == 1 || (info.Length() == 2 && !info[1]->IsFunction())) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  if (info.Length() >= 3) {
    if (!info[1]->IsNull() && !info[1]->IsUndefined() && !info[1]->IsObject()) {
      return Nan::ThrowError("Options must be an object, null, or undefined.");
    }

    if (!info[2]->IsFunction()) {
      return Nan::ThrowError("Callback is required and must be a Function.");
    }
  }

  CommitWalkBaton* baton = new CommitWalkBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->max_count = Nan::To<unsigned int>(info[0]).FromJust();
  std::vector<CommitModel *> *out = new std::vector<CommitModel *>;
  out->reserve(baton->max_count);
  baton->out = static_cast<void *>(out);
  if (info.Length() == 3 && info[1]->IsObject()) {
    v8::Local<v8::Object> options = Nan::To<v8::Object>(info[1]).ToLocalChecked();
    v8::Local<v8::String> propName = Nan::New("returnPlainObjects").ToLocalChecked();
    if (Nan::Has(options, propName).FromJust()) {
      baton->returnPlainObjects = Nan::Get(options, propName).ToLocalChecked()->IsTrue();
    } else {
      baton->returnPlainObjects = false;
    }
  } else {
    baton->returnPlainObjects = false;
  }
  baton->walk = Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue();
  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[1]->IsFunction() ? info[1] : info[2]));
  CommitWalkWorker *worker = new CommitWalkWorker(baton, callback);
  worker->SaveToPersistent("commitWalk", info.This());

  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRevwalk::CommitWalkWorker::Execute() {
  giterr_clear();

  std::vector<CommitModel *> *out = static_cast<std::vector<CommitModel *> *>(baton->out);
  for (int i = 0; i < baton->max_count; i++) {
    git_oid next_commit_id;
    baton->error_code = git_revwalk_next(&next_commit_id, baton->walk);

    if (baton->error_code == GIT_ITEROVER) {
      baton->error_code = GIT_OK;
      return;
    }

    if (baton->error_code != GIT_OK) {
      if (giterr_last() != NULL) {
        baton->error = git_error_dup(giterr_last());
      }

      while (out->size()) {
        delete out->back();
        out->pop_back();
      }

      delete out;
      baton->out = NULL;

      return;
    }

    git_commit *commit;
    baton->error_code = git_commit_lookup(&commit, git_revwalk_repository(baton->walk), &next_commit_id);

    if (baton->error_code != GIT_OK) {
      if (giterr_last() != NULL) {
        baton->error = git_error_dup(giterr_last());
      }

      while (out->size()) {
        delete out->back();
        out->pop_back();
      }

      delete out;
      baton->out = NULL;

      return;
    }

    out->push_back(new CommitModel(commit, baton->returnPlainObjects));
  }
}

void GitRevwalk::CommitWalkWorker::HandleOKCallback() {
  if (baton->out != NULL) {
    std::vector<CommitModel *> *out = static_cast<std::vector<CommitModel *> *>(baton->out);
    const unsigned int size = out->size();
    Local<Array> result = Nan::New<Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      CommitModel *commitModel = out->at(i);
      Nan::Set(
        result,
        Nan::New<Number>(i),
        commitModel->toJavascript()
      );
      delete commitModel;
    }

    delete out;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  } else if (baton->error) {
    Local<v8::Value> argv[1] = {
      Nan::Error(baton->error->message)
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message) {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
  } else if (baton->error_code < 0) {
    Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Revwalk commitWalk has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.commitWalk").ToLocalChecked());
    Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
  } else {
    callback->Call(0, NULL, async_resource);
  }
}

        NAN_METHOD(GitRevwalk::FastWalk)
{
  if (info.Length() == 0 || !info[0]->IsNumber()) {
    return Nan::ThrowError("Max count is required and must be a number.");
  }

  if (info.Length() == 1 || !info[1]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  FastWalkBaton* baton = new FastWalkBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->max_count = Nan::To<unsigned int>(info[0]).FromJust();
  baton->out = new std::vector<git_oid*>;
  baton->out->reserve(baton->max_count);
  baton->walk = Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[1]));
  FastWalkWorker *worker = new FastWalkWorker(baton, callback);
  worker->SaveToPersistent("fastWalk", info.This());

  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRevwalk::FastWalkWorker::Execute()
{
  for (int i = 0; i < baton->max_count; i++)
  {
    git_oid *nextCommit = (git_oid *)malloc(sizeof(git_oid));
    git_error_clear();
    baton->error_code = git_revwalk_next(nextCommit, baton->walk);

    if (baton->error_code != GIT_OK)
    {
      // We couldn't get a commit out of the revwalk. It's either in
      // an error state or there aren't anymore commits in the revwalk.
      free(nextCommit);

      if (baton->error_code != GIT_ITEROVER) {
        baton->error = git_error_dup(git_error_last());

        while(!baton->out->empty())
        {
          // part of me wants to #define shoot free so we can take the
          // baton out back and shoot the oids
          git_oid *oidToFree = baton->out->back();
          free(oidToFree);
          baton->out->pop_back();
        }

        delete baton->out;

        baton->out = NULL;
      }
      else {
        baton->error_code = GIT_OK;
      }

      break;
    }

    baton->out->push_back(nextCommit);
  }
}

void GitRevwalk::FastWalkWorker::HandleOKCallback()
{
  if (baton->out != NULL)
  {
    unsigned int size = baton->out->size();
    Local<Array> result = Nan::New<Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      Nan::Set(result, Nan::New<Number>(i), GitOid::New(baton->out->at(i), true));
    }

    delete baton->out;

    Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);
  }
  else
  {
    if (baton->error)
    {
      Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method fastWalk has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.fastWalk").ToLocalChecked());
      Local<v8::Value> argv[1] = {
        err
      };
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
      {
        free((void *)baton->error->message);
      }

      free((void *)baton->error);
    }
    else if (baton->error_code < 0)
    {
      std::queue< Local<v8::Value> > workerArguments;
      bool callbackFired = false;

      while(!workerArguments.empty())
      {
        Local<v8::Value> node = workerArguments.front();
        workerArguments.pop();

        if (
          !node->IsObject()
          || node->IsArray()
          || node->IsBooleanObject()
          || node->IsDate()
          || node->IsFunction()
          || node->IsNumberObject()
          || node->IsRegExp()
          || node->IsStringObject()
        )
        {
          continue;
        }

        Local<v8::Object> nodeObj = Nan::To<v8::Object>(node).ToLocalChecked();
        Local<v8::Value> checkValue = GetPrivate(nodeObj, Nan::New("NodeGitPromiseError").ToLocalChecked());

        if (!checkValue.IsEmpty() && !checkValue->IsNull() && !checkValue->IsUndefined())
        {
          Local<v8::Value> argv[1] = {
            Nan::To<v8::Object>(checkValue).ToLocalChecked()
          };
          callback->Call(1, argv, async_resource);
          callbackFired = true;
          break;
        }

        Local<v8::Array> properties = Nan::GetPropertyNames(nodeObj).ToLocalChecked();
        for (unsigned int propIndex = 0; propIndex < properties->Length(); ++propIndex)
        {
          Local<v8::String> propName = Nan::To<v8::String>(Nan::Get(properties, propIndex).ToLocalChecked()).ToLocalChecked();
          Local<v8::Value> nodeToQueue = Nan::Get(nodeObj, propName).ToLocalChecked();
          if (!nodeToQueue->IsUndefined())
          {
            workerArguments.push(nodeToQueue);
          }
        }
      }

      if (!callbackFired)
      {
        Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method next has thrown an error.")).ToLocalChecked();
        Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
        Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.fastWalk").ToLocalChecked());
        Local<v8::Value> argv[1] = {
          err
        };
        callback->Call(1, argv, async_resource);
      }
    }
    else
    {
      callback->Call(0, NULL, async_resource);
    }
  }
}

        // Note: commit is not owned by this class (must be freed elsewhere)
class FileHistoryEvent {
public:
  FileHistoryEvent(
    git_delta_t inputType,
    bool inputExistsInCurrentTree,
    bool inputIsMergeCommit,
    git_commit *inputCommit,
    const char *inputFrom,
    const char *inputTo
  ):
    type(inputType),
    existsInCurrentTree(inputExistsInCurrentTree),
    isMergeCommit(inputIsMergeCommit),
    from(inputFrom == NULL ? NULL : strdup(inputFrom)),
    to(inputTo == NULL ? NULL : strdup(inputTo)),
    commit(inputCommit)
  {
    if (inputCommit != NULL) {
      const int error = git_commit_dup(&commit, inputCommit);
      assert(error == GIT_OK);
    }
  }

  ~FileHistoryEvent() {
    if (commit != NULL) {
      git_commit_free(commit);
    }
  }

  v8::Local<v8::Value> toJavascript() {
    v8::Local<v8::Object> historyEntry = Nan::New<v8::Object>();
    v8::Local<v8::Array> owners = Nan::New<Array>(1);
    Nan::Set(
      owners,
      Nan::New<v8::Number>(owners->Length()),
      Nan::To<v8::Object>(GitRepository::New(
        git_commit_owner(commit),
        true
      )).ToLocalChecked()
    );
    Nan::Set(historyEntry, Nan::New("commit").ToLocalChecked(), GitCommit::New(commit, true, owners));
    commit = NULL;
    Nan::Set(historyEntry, Nan::New("status").ToLocalChecked(), Nan::New<Number>(type));
    Nan::Set(historyEntry, Nan::New("isMergeCommit").ToLocalChecked(), Nan::New(isMergeCommit));
    if (type == GIT_DELTA_RENAMED) {
      if (from != NULL) {
        Nan::Set(historyEntry, Nan::New("oldName").ToLocalChecked(), Nan::New(from).ToLocalChecked());
      }
      if (to != NULL) {
        Nan::Set(historyEntry, Nan::New("newName").ToLocalChecked(), Nan::New(to).ToLocalChecked());
      }
    }
    return historyEntry;
  }

  static int buildHistoryEvent(
    FileHistoryEvent **fileHistoryEvent,
    git_repository *repo,
    git_commit *currentCommit,
    git_tree *currentTree,
    git_tree *parentTree,
    const char *filePath
  ) {
    int errorCode;
    git_tree_entry *currentEntry;
    if (git_tree_entry_bypath(&currentEntry, currentTree, filePath) != GIT_OK) {
      currentEntry = NULL;
    }
    git_tree_entry *parentEntry;
    if (git_tree_entry_bypath(&parentEntry, parentTree, filePath) != GIT_OK) {
      parentEntry = NULL;
    }

    if (!currentEntry && !parentEntry) {
      *fileHistoryEvent = new FileHistoryEvent(GIT_DELTA_UNMODIFIED, false, false, currentCommit, NULL, NULL);
      return GIT_OK;
    }

    // The filePath was added
    if (currentEntry && !parentEntry) {
      git_diff *diff;
      if ((errorCode = git_diff_tree_to_tree(&diff, repo, parentTree, currentTree, NULL)) != GIT_OK) {
        git_tree_entry_free(currentEntry);
        return errorCode;
      }
      if ((errorCode = git_diff_find_similar(diff, NULL)) != GIT_OK) {
        git_diff_free(diff);
        git_tree_entry_free(currentEntry);
        return errorCode;
      }
      const size_t numDeltas = git_diff_num_deltas(diff);
      for (size_t i = 0; i < numDeltas; ++i) {
        const git_diff_delta *delta = git_diff_get_delta(diff, i);
        if (delta->new_file.path != NULL && std::strcmp(delta->new_file.path, filePath) == 0) {
          if (delta->status == GIT_DELTA_RENAMED
            || (delta->old_file.path != NULL && std::strcmp(delta->old_file.path, filePath) != 0)) {
            *fileHistoryEvent = new FileHistoryEvent(
              GIT_DELTA_RENAMED,
              true,
              false,
              currentCommit,
              delta->old_file.path,
              delta->new_file.path
            );
            git_diff_free(diff);
            git_tree_entry_free(currentEntry);
            return GIT_OK;
          }
          break;
        }
      }
      git_diff_free(diff);
      git_tree_entry_free(currentEntry);

      *fileHistoryEvent = new FileHistoryEvent(GIT_DELTA_ADDED, true, false, currentCommit, NULL, NULL);
      return GIT_OK;
    }

    // The filePath was deleted
    if (!currentEntry && parentEntry) {
      git_diff *diff;
      if ((errorCode = git_diff_tree_to_tree(&diff, repo, parentTree, currentTree, NULL)) != GIT_OK) {
        git_tree_entry_free(parentEntry);
        return errorCode;
      }
      if ((errorCode = git_diff_find_similar(diff, NULL)) != GIT_OK) {
        git_diff_free(diff);
        git_tree_entry_free(parentEntry);
        return errorCode;
      }
      const size_t numDeltas = git_diff_num_deltas(diff);
      for (size_t i = 0; i < numDeltas; ++i) {
        const git_diff_delta *delta = git_diff_get_delta(diff, i);
        if (delta->old_file.path != NULL && std::strcmp(delta->old_file.path, filePath) == 0) {
          if (delta->status == GIT_DELTA_RENAMED
            || (delta->new_file.path != NULL && std::strcmp(delta->new_file.path, filePath) != 0)) {
            *fileHistoryEvent = new FileHistoryEvent(
              GIT_DELTA_RENAMED,
              false,
              false,
              currentCommit,
              delta->old_file.path,
              delta->new_file.path
            );
            git_diff_free(diff);
            git_tree_entry_free(parentEntry);
            return GIT_OK;
          }
          break;
        }
      }
      git_diff_free(diff);
      git_tree_entry_free(parentEntry);

      *fileHistoryEvent =  new FileHistoryEvent(GIT_DELTA_DELETED, false, false, currentCommit, NULL, NULL);
      return GIT_OK;
    }

    if (git_oid_cmp(git_tree_entry_id(currentEntry), git_tree_entry_id(parentEntry)) != 0
        || git_tree_entry_filemode(currentEntry) != git_tree_entry_filemode(parentEntry)
    ) {
      git_tree_entry_free(parentEntry);
      git_tree_entry_free(currentEntry);
      *fileHistoryEvent = new FileHistoryEvent(GIT_DELTA_MODIFIED, true, false, currentCommit, NULL, NULL);
      return GIT_OK;
    }

    *fileHistoryEvent = new FileHistoryEvent(GIT_DELTA_UNMODIFIED, true, false, currentCommit, NULL, NULL);
    git_tree_entry_free(parentEntry);
    git_tree_entry_free(currentEntry);
    return GIT_OK;
  }

  git_delta_t type;
  bool existsInCurrentTree, isMergeCommit;
  const char *from, *to;
  git_commit *commit;
};

NAN_METHOD(GitRevwalk::FileHistoryWalk)
{
  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("File path to get the history is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Max count is required and must be a number.");
  }

  if (info.Length() == 2 || !info[2]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  FileHistoryWalkBaton* baton = new FileHistoryWalkBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  Nan::Utf8String from_js_file_path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  baton->file_path = strdup(*from_js_file_path);
  baton->max_count = Nan::To<unsigned int>(info[1]).FromJust();
  baton->out = new std::vector<void *>;
  baton->out->reserve(baton->max_count);
  baton->walk = Nan::ObjectWrap::Unwrap<GitRevwalk>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(Local<Function>::Cast(info[2]));
  FileHistoryWalkWorker *worker = new FileHistoryWalkWorker(baton, callback);
  worker->SaveToPersistent("fileHistoryWalk", info.This());

  Nan::AsyncQueueWorker(worker);
  return;
}

void GitRevwalk::FileHistoryWalkWorker::Execute()
{
  git_repository *repo = git_revwalk_repository(baton->walk);
  git_oid currentOid;
  git_error_clear();
  for (
    unsigned int revwalkIterations = 0;
    revwalkIterations < baton->max_count && (baton->error_code = git_revwalk_next(&currentOid, baton->walk)) == GIT_OK;
    ++revwalkIterations
  ) {
    git_commit *currentCommit;
    if ((baton->error_code = git_commit_lookup(&currentCommit, repo, &currentOid)) != GIT_OK) {
      break;
    }

    git_tree *currentTree;
    if ((baton->error_code = git_commit_tree(&currentTree, currentCommit)) != GIT_OK) {
      git_commit_free(currentCommit);
      break;
    }

    const unsigned int parentCount = git_commit_parentcount(currentCommit);
    if (parentCount == 0) {
      git_tree_entry* entry;
      if (git_tree_entry_bypath(&entry, currentTree, baton->file_path) == GIT_OK) {
        baton->out->push_back(new FileHistoryEvent(GIT_DELTA_ADDED, false, false, currentCommit, NULL, NULL));
        git_tree_entry_free(entry);
      }
      git_commit_free(currentCommit);
      git_tree_free(currentTree);
      continue;
    }

    if (parentCount == 1) {
      git_commit *parentCommit;
      if ((baton->error_code = git_commit_parent(&parentCommit, currentCommit, 0)) != GIT_OK) {
        git_commit_free(currentCommit);
        git_tree_free(currentTree);
        break;
      }

      git_tree *parentTree;
      if ((baton->error_code = git_commit_tree(&parentTree, parentCommit)) != GIT_OK) {
        git_commit_free(currentCommit);
        git_commit_free(parentCommit);
        git_tree_free(currentTree);
        break;
      }


      FileHistoryEvent *fileHistoryEvent;
      if ((baton->error_code = FileHistoryEvent::buildHistoryEvent(
        &fileHistoryEvent,
        repo,
        currentCommit,
        currentTree,
        parentTree,
        baton->file_path
      )) != GIT_OK) {
        git_commit_free(currentCommit);
        git_commit_free(parentCommit);
        git_tree_free(currentTree);
        git_tree_free(parentTree);
        break;
      }

      if (fileHistoryEvent->type != GIT_DELTA_UNMODIFIED) {
        baton->out->push_back(fileHistoryEvent);
      }

      git_commit_free(currentCommit);
      git_commit_free(parentCommit);
      git_tree_free(currentTree);
      git_tree_free(parentTree);
      continue;
    }

    std::pair<bool, unsigned int> firstMatchingParentIndex(false, 0);
    bool fileExistsInCurrent = false, fileExistsInSomeParent = false;
    for (unsigned int parentIndex = 0; parentIndex < parentCount; ++parentIndex) {
      git_commit *parentCommit;
      if ((baton->error_code = git_commit_parent(&parentCommit, currentCommit, parentIndex)) != GIT_OK) {
        break;
      }

      git_tree *parentTree;
      if ((baton->error_code = git_commit_tree(&parentTree, parentCommit)) != GIT_OK) {
        git_commit_free(parentCommit);
        break;
      }

      FileHistoryEvent *fileHistoryEvent;
      if ((baton->error_code = FileHistoryEvent::buildHistoryEvent(
        &fileHistoryEvent,
        repo,
        currentCommit,
        currentTree,
        parentTree,
        baton->file_path
      )) != GIT_OK) {
        git_tree_free(parentTree);
        git_commit_free(parentCommit);
        break;
      }

      switch (fileHistoryEvent->type) {
        case GIT_DELTA_ADDED: {
          fileExistsInCurrent = true;
          break;
        }
        case GIT_DELTA_MODIFIED: {
          fileExistsInCurrent = true;
          fileExistsInSomeParent = true;
          break;
        }
        case GIT_DELTA_DELETED: {
          fileExistsInSomeParent = true;
          break;
        }
        case GIT_DELTA_RENAMED: {
          if (fileHistoryEvent->existsInCurrentTree) {
            fileExistsInCurrent = true;
          } else {
            fileExistsInSomeParent = true;
          }
          break;
        }
        case GIT_DELTA_UNMODIFIED: {
          if (fileHistoryEvent->existsInCurrentTree) {
            fileExistsInCurrent = true;
            fileExistsInSomeParent = true;
          }
          firstMatchingParentIndex = std::make_pair(true, parentIndex);
          break;
        }
        default: {
          break;
        }
      }

      delete fileHistoryEvent;
      git_commit_free(parentCommit);
      git_tree_free(parentTree);

     if (firstMatchingParentIndex.first) {
        break;
      }
    }

    if (baton->error_code != GIT_OK) {
      git_tree_free(currentTree);
      git_commit_free(currentCommit);
      break;
    }

    if (!firstMatchingParentIndex.first) {
      assert(fileExistsInCurrent || fileExistsInSomeParent);
      git_delta_t mergeType = GIT_DELTA_UNREADABLE; // It will never result in this case because of the assertion above.
      if (fileExistsInCurrent && fileExistsInSomeParent) {
        mergeType = GIT_DELTA_MODIFIED;
      } else if (fileExistsInCurrent) {
        mergeType = GIT_DELTA_ADDED;
      } else if (fileExistsInSomeParent) {
        mergeType = GIT_DELTA_DELETED;
      }

      FileHistoryEvent *fileHistoryEvent = new FileHistoryEvent(
        mergeType,
        mergeType != GIT_DELTA_DELETED,
        true,
        currentCommit,
        NULL,
        NULL
      );
      baton->out->push_back(fileHistoryEvent);
      git_tree_free(currentTree);
      git_commit_free(currentCommit);
      continue;
    }

    assert(firstMatchingParentIndex.first);
    for (unsigned int parentIndex = 0; parentIndex < parentCount; ++parentIndex) {
      if (parentIndex == firstMatchingParentIndex.second) {
        continue;
      }

      const git_oid *parentOid = git_commit_parent_id(currentCommit, parentIndex);
      assert(parentOid != NULL);
      git_revwalk_hide(baton->walk, parentOid);
    }
    git_commit_free(currentCommit);
    git_tree_free(currentTree);
  }

  if (baton->error_code != GIT_OK && baton->error_code != GIT_ITEROVER) {
    // Something went wrong in our loop, discard everything in the async worker
    for (unsigned int i = 0; i < baton->out->size(); ++i) {
      delete static_cast<FileHistoryEvent *>(baton->out->at(i));
    }
    delete baton->out;
    baton->out = NULL;
    baton->error = git_error_dup(git_error_last());
  }
  free((void *)baton->file_path);
  baton->file_path = NULL;
}

void GitRevwalk::FileHistoryWalkWorker::HandleOKCallback()
{
  if (baton->out != NULL) {
    const unsigned int size = baton->out->size();
    v8::Local<v8::Array> result = Nan::New<v8::Array>(size);
    for (unsigned int i = 0; i < size; i++) {
      FileHistoryEvent *batonResult = static_cast<FileHistoryEvent *>(baton->out->at(i));
      Nan::Set(result, Nan::New(i), batonResult->toJavascript());
      delete batonResult;
    }

    Nan::Set(result, Nan::New("reachedEndOfHistory").ToLocalChecked(), Nan::New(baton->error_code == GIT_ITEROVER));

    v8::Local<v8::Value> argv[2] = {
      Nan::Null(),
      result
    };
    callback->Call(2, argv, async_resource);

    delete baton->out;
    return;
  }

  if (baton->error) {
    v8::Local<v8::Object> err;
    if (baton->error->message) {
      err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
    } else {
      err = Nan::To<v8::Object>(Nan::Error("Method fileHistoryWalk has thrown an error.")).ToLocalChecked();
    }
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.fileHistoryWalk").ToLocalChecked());
    v8::Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
    if (baton->error->message)
    {
      free((void *)baton->error->message);
    }

    free((void *)baton->error);
    return;
  }

  if (baton->error_code < 0) {
    v8::Local<v8::Object> err = Nan::To<v8::Object>(Nan::Error("Method next has thrown an error.")).ToLocalChecked();
    Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
    Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(), Nan::New("Revwalk.fileHistoryWalk").ToLocalChecked());
    v8::Local<v8::Value> argv[1] = {
      err
    };
    callback->Call(1, argv, async_resource);
    return;
  }

  callback->Call(0, NULL, async_resource);
}

    // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRevwalkTraits>;
 