// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
    #include <git2/sys/filter.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/filter_source.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/repository.h"
  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitFilterSource::~GitFilterSource() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
                      }

  void GitFilterSource::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("FilterSource").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "repo", Repo);
            Nan::SetPrototypeMethod(tpl, "path", Path);
            Nan::SetPrototypeMethod(tpl, "filemode", Filemode);
            Nan::SetPrototypeMethod(tpl, "id", Id);
            Nan::SetPrototypeMethod(tpl, "mode", Mode);
            Nan::SetPrototypeMethod(tpl, "flags", Flags);
    
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("FilterSource").ToLocalChecked(), _constructor_template);
  }

       // NOTE you may need to occasionally rebuild this method by calling the generators
// if major changes are made to the templates / generator.

// Due to some garbage collection issues related to submodules and git_filters, we need to clone the repository
// pointer before giving it to a user.

/*
 * @param Repository callback
 */
NAN_METHOD(GitFilterSource::Repo) {
  if (info.Length() == 0 || !info[0]->IsFunction()) {
    return Nan::ThrowError("Callback is required and must be a Function.");
  }

  RepoBaton *baton = new RepoBaton;

  baton->error_code = GIT_OK;
  baton->error = NULL;
  baton->src = Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue();

  Nan::Callback *callback = new Nan::Callback(v8::Local<Function>::Cast(info[0]));
  RepoWorker *worker = new RepoWorker(baton, callback);

  worker->SaveToPersistent("src", info.This());

  AsyncLibgit2QueueWorker(worker);
  return;
}

void GitFilterSource::RepoWorker::Execute() {
  git_error_clear();

  {
    LockMaster lockMaster(true, baton->src);

    git_repository *repo = git_filter_source_repo(baton->src);
    baton->error_code = git_repository_open(&repo, git_repository_path(repo));

    if (baton->error_code == GIT_OK) {
      baton->out = repo;
    } else if (git_error_last() != NULL) {
      baton->error = git_error_dup(git_error_last());
    }
  }
}

void GitFilterSource::RepoWorker::HandleOKCallback() {
  if (baton->error_code == GIT_OK) {
    v8::Local<v8::Value> to;

    if (baton->out != NULL) {
      to = GitRepository::New(baton->out, true);
    } else {
      to = Nan::Null();
    }

    v8::Local<v8::Value> argv[2] = {Nan::Null(), to};
    callback->Call(2, argv, async_resource);
  } else {
    if (baton->error) {
      v8::Local<v8::Object> err;
      if (baton->error->message) {
        err = Nan::To<v8::Object>(Nan::Error(baton->error->message)).ToLocalChecked();
      } else {
        err = Nan::To<v8::Object>(Nan::Error("Method repo has thrown an error.")).ToLocalChecked();
      }
      Nan::Set(err, Nan::New("errno").ToLocalChecked(), Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(),
               Nan::New("FilterSource.repo").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {err};
      callback->Call(1, argv, async_resource);
      if (baton->error->message)
        free((void *)baton->error->message);
      free((void *)baton->error);
    } else if (baton->error_code < 0) {
      v8::Local<v8::Object> err =
          Nan::To<v8::Object>(Nan::Error("Method repo has thrown an error.")).ToLocalChecked();
      Nan::Set(err, Nan::New("errno").ToLocalChecked(),
               Nan::New(baton->error_code));
      Nan::Set(err, Nan::New("errorFunction").ToLocalChecked(),
               Nan::New("FilterSource.repo").ToLocalChecked());
      v8::Local<v8::Value> argv[1] = {err};
      callback->Call(1, argv, async_resource);
    } else {
      callback->Call(0, NULL, async_resource);
    }
  }

  delete baton;
}

   
/*
     * @return String  result    */
NAN_METHOD(GitFilterSource::Path) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

 const char * result =     git_filter_source_path(
          Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
  if (result){
       to = Nan::New<v8::String>(result).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Number  result    */
NAN_METHOD(GitFilterSource::Filemode) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

 uint16_t result =     git_filter_source_filemode(
          Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     * @return Oid  result    */
NAN_METHOD(GitFilterSource::Id) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

 const git_oid * result =     git_filter_source_id(
          Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

        // null checks on pointers
        if (!result) {
          return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
        }

      v8::Local<v8::Value> to;
// start convert_to_v8 block
    if (result != NULL) {
      v8::Local<v8::Array> owners = Nan::New<Array>(0);
            Nan::Set(owners, owners->Length(), info.This());
          to = GitOid::New(
        result,
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
     * @return Number  result    */
NAN_METHOD(GitFilterSource::Mode) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

 git_filter_mode_t result =     git_filter_source_mode(
          Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
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
NAN_METHOD(GitFilterSource::Flags) {
  Nan::EscapableHandleScope scope;


  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );

 uint32_t result =     git_filter_source_flags(
          Nan::ObjectWrap::Unwrap<GitFilterSource>(info.This())->GetValue()
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
    // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitFilterSourceTraits>;
 